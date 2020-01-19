import colors from 'vuetify/es5/util/colors'

export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
            { name: 'google-site-verification', content:'9VGw1vGDng4XjENSPsdsIUp3wLu3s9mSc7-VD2boKO8' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css'
            }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        //{ src: '~plugins/maps.js', ssr: true },
    ],

    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxt/typescript-build',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/apollo'
    ],
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    /*
     * Apollo module configuration
     */
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint:'http://api:3001/graphql'
            },
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend (config, ctx) {
        }
    }
}
