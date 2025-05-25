import { defineStore } from 'pinia'
import { LoginRequest, type ILoginRequest } from '~/models/api/login/request';
import type { ILoginResponse } from '~/models/api/login/response';
import type { IProfileResponse } from '~/models/api/profile/response';
import type { IRefreshTokenResponse } from '~/models/api/refresh-token/response';
import { RegisterRequest, type IRegisterRequest } from '~/models/api/register/request';
import type { IRegisterResponse } from '~/models/api/register/response';
import type { IUserDto } from '~/models/dto/user/IUser.dto'
import { UserDto } from '~/models/dto/user/User.dto'

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: "",
    refreshToken: "",
    currentUser: {
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      avatar: '',
    } as IUserDto,
    lastCheckedAt: 0,
    isLoading: false,
    isAuthenticated: false,
    error: null as string | null,
  }),
  
  getters: {
    user: (state): UserDto | null => {
      if(state.currentUser.id) {
        return new UserDto(state.currentUser);
      } else if(window) {
        return new UserDto(JSON.parse(localStorage.getItem("user") || "{}"));
      }
      return null;
    },
    getIsAuthenticated: (state): boolean => {
      if(window && localStorage.getItem("is_authenticated")) {
        return localStorage.getItem("is_authenticated") === "true";
      }
      return state.isAuthenticated;
    }
  },
  
  actions: {
    async login(request: ILoginRequest) {
      this.isLoading = true
      this.error = null
      
      try {
        // In a real app, this would be an API call
        const requestDto = new LoginRequest(request);
        
        const response = await $fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          body: requestDto.toString()
        }) as ILoginResponse;

        this.currentUser = new UserDto(response.user);
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;
        if(window) {
          localStorage.setItem("user", JSON.stringify(this.currentUser));
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);
          localStorage.setItem("is_authenticated", "true");
        }

        this.isAuthenticated = true
        
        return this.currentUser
      } catch (error) {
        this.error = 'Invalid email or password'
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async googleLogin() {
      this.isLoading = true
      this.error = null
       window.location.href = 'http://localhost:3001/api/auth/google'
    },
    
    async logout() {
      this.isLoading = true
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        this.currentUser = {
          id: '',
          firstname: '',
          lastname: '',
          email: '',
          avatar: '',
        } as IUserDto;
        this.accessToken = '';
        this.refreshToken = '';
        this.isAuthenticated = false;
        if(window) {
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    
    async setUser(accessToken: string, refreshToken: string) {
      const router = useRouter()
      this.isLoading = true
      this.error = null
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      const response = await $fetch('http://localhost:3001/api/auth/profile', {
        headers: {  
          Authorization: `Bearer ${accessToken}`
        }
      }) as IProfileResponse;
      if (response) {
        this.currentUser = response.user;
        this.isAuthenticated = true;
        if(window) {
          localStorage.setItem("user", JSON.stringify(this.currentUser));
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          localStorage.setItem("is_authenticated", "true");
        }
      }
      this.isLoading = false
      router.push('/')
    },

    async checkIsAuthenticated() {
      console.log("checkIsAuthenticated", this.lastCheckedAt);
      if(this.lastCheckedAt > Date.now() - 1000 * 60 * 5) {
        return true;
      }
      let result = false;
      try {
        let tempToken = '';
        if(this.accessToken) {
          tempToken = this.accessToken;
        } else if(window) {
          tempToken = localStorage.getItem("access_token") || '';
        }
        const response = await $fetch('http://localhost:3001/api/auth/profile', {
          headers: {  
            Authorization: `Bearer ${tempToken}`
          }
        }) as IProfileResponse;
        console.log("isAuthenticated", response);
        this.currentUser = new UserDto(response.user as IUserDto);
        this.accessToken = tempToken;
        this.isAuthenticated = true;
        if(window) {
          localStorage.setItem("user", JSON.stringify(this.currentUser));
          localStorage.setItem("access_token", tempToken);
          localStorage.setItem("is_authenticated", "true");
        }
        result = true;
      } catch (error: any) {
        if(error?.statusCode === 401) {
          result = await this.refreshNewAccessToken();
        }
        console.error("isAuthenticated", error);
        this.isAuthenticated = false;
        if(window) {
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("is_authenticated");
        }
        result = false;
      } finally {
        if(this.isAuthenticated) {
          this.lastCheckedAt = Date.now();
        }
        return result;
      }
    },

    async refreshNewAccessToken() {
      try {
        let refreshToken = '';
        if(this.refreshToken) {
          refreshToken = this.refreshToken;
        } else if(window) {
          refreshToken = localStorage.getItem("refresh_token") || '';
        }
        const response = await $fetch('http://localhost:3001/api/auth/refresh-token', {
          method: 'POST',
          headers: {  
            Authorization: `Bearer ${refreshToken}`
          }
        }) as IRefreshTokenResponse;
        this.currentUser = new UserDto(response.user);
        this.accessToken = response.access_token;
        if(window) {
          localStorage.setItem("user", JSON.stringify(this.currentUser));
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("is_authenticated", "true");
        }
        this.isAuthenticated = true;
        console.log("refresh token", response);
        return true;
      } catch (error) {
        console.error("refresh token", error);
        this.isAuthenticated = false;
        
        if(window) {
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("is_authenticated");
        }
        return false;
      }
    },

    async register(request: IRegisterRequest) {
      this.isLoading = true
      this.error = null
      
      try {
        const requestDto = new RegisterRequest(request);

        const response = await $fetch('http://localhost:3001/api/auth/register', {
          method: 'POST',
          body: requestDto.toString()
        }) as IRegisterResponse;
        // Mock successful registration
        this.currentUser = new UserDto(response.user);
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;
        this.isAuthenticated = true
        if(window) {
          localStorage.setItem("user", JSON.stringify(this.currentUser));
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);
          localStorage.setItem("is_authenticated", "true");
        }
        
        return this.currentUser
      } catch (error) {
        this.error = 'Registration failed'
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})