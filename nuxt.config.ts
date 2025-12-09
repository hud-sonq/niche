export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/global.css'],
  ssr: false,
  app: {
    baseURL: '/niche',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }
      ]
    },
  },
})