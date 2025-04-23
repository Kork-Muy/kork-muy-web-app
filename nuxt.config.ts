// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-icon',
    'shadcn-nuxt'
  ],

  app: {
    head: {
      title: 'Kork Muy',
      meta: [
        { name: 'description', content: 'A modern event management platform' },
        { name: 'theme-color', content: '#ffffff' }
      ],
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Kork Muy',
      short_name: 'KorkMuy',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
  },

  shadcn: {
    /**
     * Prefix for component imports
     * @example imports: 'shadcn' -> import { Button } from '~/components/shadcn'
     * @default 'ui'
     */
    prefix: 'ui',
    /**
     * Directory that the components are stored in
     * @default 'components/ui'
     */
    componentDir: 'components/ui'
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
  },

  compatibilityDate: '2025-04-23'
})