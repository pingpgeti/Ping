export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'KN Ping',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Koło Naukowe PING funkcjonuje na Wydziale Elektroniki, Telekomunikacji i Informatyki Politechniki Gdańskiej i zajmuje się tematyką cyberbezpieczeństwa i sieci komputerowych. Działamy w ramach sekcji CTF, sekcji programistycznej oraz cotygodniowych spotkań organizowanych przez studentów. Napisz do nas na fanpejdż, aby dowiedzieć się więcej!' },
      { name: 'format-detection', content: 'telephone=yes' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Mono&display=swap'}
    ]
  },
  target: 'static',
  ssr: true,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/lightGallery.js', mode: 'client'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/prismic'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo'
  ],

  apollo: {
    clientConfigs: {
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["@prismicio/vue"],
  }
}
