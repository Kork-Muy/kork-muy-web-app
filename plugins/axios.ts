import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import type { IRefreshTokenResponse } from '~/models/api/refresh-token/response'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  const axiosInstance = axios.create({
    baseURL: config.public.apiBase || '/api',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get token from auth store or localStorage if needed
      const userStore = useUserStore()
      const token = userStore.accessToken;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

      // Handle 401 Unauthorized errors
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const userStore = useUserStore()
          const refreshToken = userStore.refreshToken;
          const response = await axiosInstance.post('/api/auth/refresh-token', {
            headers: {  
              Authorization: `Bearer ${refreshToken}`
            }
          }) as IRefreshTokenResponse;
          userStore.accessToken = response.access_token;
          userStore.isAuthenticated = true;
          if(window) {
            localStorage.setItem("access_token", response.access_token);
          }
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          // Handle refresh token failure
          localStorage.removeItem('token')
          // Redirect to login or handle as needed
          navigateTo('/login')
          return Promise.reject(refreshError)
        }
      }

      // Handle other errors
      if (error.response) {
        // Handle specific error status codes
        switch (error.response.status) {
          case 403:
            // Handle forbidden
            break
          case 404:
            // Handle not found
            break
          case 500:
            // Handle server error
            break
        }
      }

      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: axiosInstance
    }
  }
})
