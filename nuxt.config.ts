// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/image'],
googleFonts: {
    families: {
      Montserrat: [
        300,
        400,
        500,
        600,
        700,
        800,
      ],
    },
    display: 'swap',
    preload: true,
  },
  app: {
    head: {
      title: 'Glotelho Test',
      meta: [
        { name: 'description', content: 'My Test implementation in preparation for Glothelho Interview' },
      ]
    }
  }
})