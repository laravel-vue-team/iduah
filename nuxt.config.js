export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'إضاءة',
    htmlAttrs: {
      lang: 'ar',
      dir: 'rtl'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/media/style.scss',
  ],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    {
      src: '~/plugins/quill',
      mode: 'client'
    }
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@tui-nuxt/editor',
    '@nuxtjs/markdownit'
  ],
  tui: {
    editor: {
      stylesheet: {
        editor: 'tui-editor/dist/tui-editor.min.css',
        contents: 'tui-editor/dist/tui-editor-contents.min.css',
        codemirror: 'codemirror/lib/codemirror.css',
        codeHighlight: 'highlight.js/styles/github.css',
        colorPicker: 'tui-color-picker/dist/tui-color-picker.min.css'
      }
    }
  },
  markdownit: {
    runtime: true // Support `$md()`
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "https://idauh.com/idauh"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  //Loading before get data
  loading: {
    color: 'blue',
    height: '5px'
  },

  //loadingIndicator
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white',
  },

  // router: {
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       name: 'article',
  //       path: '/articles/:id',
  //       component: resolve(__dirname, 'pages/articles/_article.vue')
  //     })
  //   }
  // },


}
