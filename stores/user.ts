import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null,
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