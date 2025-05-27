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

  axiosInstance.defaults.withCredentials = true;

  axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // handle request with httponly cookie
    config.withCredentials = true;
    return config;
  })

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
      const userStore = useUserStore();

      // Handle 401 Unauthorized errors
      if (error.response?.status === 401 && !originalRequest._retry && !userStore.isRefreshing) {
        originalRequest._retry = true
        await userStore.refreshNewAccessToken();
        return axiosInstance(originalRequest)
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
      console.log("error", error);

      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: axiosInstance
    }
  }
})
