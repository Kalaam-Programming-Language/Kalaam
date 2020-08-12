module.exports = {
  "transpileDependencies": [
    "vuetify",
    "pwa"
  ]

  /* pwa: {
     name: 'Kalaam',
     themeColor: '#F8E71C',
     background_color: '#FFFFFF',
     workboxPluginMode: 'InjectManifest',
     workboxOptions: {
       swSrc: 'public/service-worker.js',
       exclude: [
         /\.map$/,
         /\._redirects$/,
         '_redirects'
       ],
       excludeChunks: [
         '_redirects'
       ]
     },
     msTileColor: '#FFFFFF'
   }
   */,

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  transpileDependencies: [
    'vuetify',
    'pwa',
    'quasar'
  ]
}
