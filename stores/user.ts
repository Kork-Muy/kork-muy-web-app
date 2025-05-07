import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: "",
    currentUser: {
        id: '1',
        name: 'Orng',
        email: "neuporng123@gmail.com",
        avatar: '/images/avatar.jpg'
    } as User,
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null,
  }),
  
  getters: {
    user: (state) => state.currentUser,
  },
  
  actions: {
    async login(email: string, password: string) {
      this.isLoading = true
      this.error = null
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock successful login
        this.currentUser = {
          id: '1',
          name: 'John Doe',
          email: email,
          avatar: '/images/avatar.jpg'
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
        
        this.currentUser = null
        this.isAuthenticated = false
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    
    async setUser(token: string) {
      const router = useRouter()
      this.isLoading = true
      this.error = null
      this.token = token
      this.isAuthenticated = true
      console.log('setUser', token)
      const response = await $fetch('http://localhost:3001/api/auth/profile', {
        headers: {  
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)
      if (response) {
        this.currentUser.id = response.id
        this.currentUser.name = response.firstName + ' ' + response.lastName
        this.currentUser.email = response.email
        this.currentUser.avatar = response.avatar
      }
      this.isLoading = false
      router.push('/')
    },

    async register(name: string, email: string, password: string) {
      this.isLoading = true
      this.error = null
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock successful registration
        this.currentUser = {
          id: Date.now().toString(),
          name,
          email,
          avatar: '/images/avatar.jpg'
        }
        this.isAuthenticated = true
        
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