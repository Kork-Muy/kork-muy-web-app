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
    isConnected: true,
    isRefreshing: false,
    error: null as string | null,
    offlineMode: false,
  }),
  
  getters: {
    user: (state): UserDto | null => {
      if(state.isAuthenticated) {
        return new UserDto(state.currentUser);
      } else if(state.isAuthenticated && window) {
        return new UserDto(JSON.parse(localStorage.getItem("user") || state.currentUser.toString()));
      }
      return new UserDto({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        avatar: '',
      });
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
        const { $axios } = useNuxtApp();
        
        const response = (await $axios.post('/api/auth/login', requestDto.toString())).data as ILoginResponse;

        this.currentUser = new UserDto(response.user);
        if(window) {
          localStorage.setItem("user", JSON.stringify(this.currentUser));
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
        const { $axios } = useNuxtApp();
        await $axios.post('/api/auth/logout');
        
        this.currentUser = {
          id: '',
          firstname: '',
          lastname: '',
          email: '',
          avatar: '',
        } as IUserDto;
        this.isAuthenticated = false;
        if(window) {
          localStorage.removeItem("user");
          localStorage.setItem("is_authenticated", "false");
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    
    async fetchProfile() {
      this.isLoading = true
      this.error = null
      const { $axios } = useNuxtApp();
      const response = (await $axios.get('/api/auth/profile')).data as IProfileResponse;
      if (response) {
        this.currentUser = response.user;
        this.isAuthenticated = true;
        if(window) {
          localStorage.setItem("user", JSON.stringify(this.currentUser));
          localStorage.setItem("is_authenticated", "true");
        }
      }
      this.isLoading = false
    },

    async refreshNewAccessToken() {
      try {
        const { $axios } = useNuxtApp();
        this.isRefreshing = true;
        const response = await $axios.post('/api/auth/refresh-token') as IRefreshTokenResponse;
        this.currentUser = new UserDto(response.user);
        if(window) {
          localStorage.setItem("user", JSON.stringify(this.currentUser));
          localStorage.setItem("is_authenticated", "true");
        }
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        this.isAuthenticated = false;
        
        if(window) {
          localStorage.removeItem("user");
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
        const { $axios } = useNuxtApp();
        const response = (await $axios.post('/api/auth/register', requestDto.toString())).data as IRegisterResponse;
        // Mock successful registration
        this.currentUser = new UserDto(response.user);
        this.isAuthenticated = true
        if(window) {
          localStorage.setItem("user", JSON.stringify(this.currentUser));
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
    },

    setOfflineMode(offlineMode: boolean) {
      this.offlineMode = offlineMode;
    },

    loadOfflineTickets() {
      if(window) {
        this.currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        this.isAuthenticated = localStorage.getItem("is_authenticated") === "true";
      }
    },

    async initialize() {
      if(this.offlineMode) {
        this.loadOfflineTickets();
      } else {
        this.fetchProfile();
      }
    }
  }
})