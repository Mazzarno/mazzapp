// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Alexis Germain',

      link: [
      
        { rel: "icon", type: "image/png", href: "icologo.png",  },
        ],
      meta: [
        {
          name: 'description',
          content: ''
        }
      ] 
    },
  },

  nitro: { preset: "netlify-edge" },

  css: [
    '@/assets/css/styles.css',
  ],

  modules: [
    '@nuxt/devtools',
    '@tresjs/nuxt',
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/google-fonts', {
        prefetch: true,
        download: true,
        families: {
          'Maven+Pro': [400, 500, 700]
        }
      }
    ],
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ]
  ],

  imports: {
    dirs: ['stores']
  },

  tres: {
    devtools: true,
    glsl: true
  },

  compatibilityDate: '2024-09-07',
})