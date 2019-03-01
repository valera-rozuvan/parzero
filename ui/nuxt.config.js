import dotenv from 'dotenv';

dotenv.config();
const relayUrl = process.env.RELAY_URL || 'http://localhost:3000';

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'parzero-ui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'parzero-ui' }
    ],
    link: [
      { rel: "apple-touch-icon", sizes: "57x57", href: "/apple-icon-57x57.png" },
      { rel: "apple-touch-icon", sizes: "60x60", href: "/apple-icon-60x60.png" },
      { rel: "apple-touch-icon", sizes: "72x72", href: "/apple-icon-72x72.png" },
      { rel: "apple-touch-icon", sizes: "76x76", href: "/apple-icon-76x76.png" },
      { rel: "apple-touch-icon", sizes: "114x114", href: "/apple-icon-114x114.png" },
      { rel: "apple-touch-icon", sizes: "120x120", href: "/apple-icon-120x120.png" },
      { rel: "apple-touch-icon", sizes: "144x144", href: "/apple-icon-144x144.png" },
      { rel: "apple-touch-icon", sizes: "152x152", href: "/apple-icon-152x152.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-icon-180x180.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-icon-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/manifest.json" },

      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'not-found-handler',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      });
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev }) {
      const htmlWebpackPlugin = config.plugins.find((plugin) => {
        return plugin.constructor.name === 'HtmlWebpackPlugin';
      });

      if (htmlWebpackPlugin && htmlWebpackPlugin.options) {
        Object.assign(htmlWebpackPlugin.options, { hash: true });
      }

      if (isDev) {
        config.devtool = 'source-map';

        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  render: {
    bundleRenderer: {
      shouldPreload: () => {
        return false;
      }
    }
  },
  css: [
    {
      src: '@/assets/styles/app.styl',
      lang: 'styl'
    }
  ],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/axios'
  ],
  watchers: {
    webpack: {
      // Allows hot-reload on Windows
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  env: {
    relayUrl
  }
};
