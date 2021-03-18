module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html')
      .tap(args => {
        args[0].isProd = true
        return args
      })

    }
  },
  productionSourceMap: false,
  configureWebpack: {
    externals: process.env.NODE_ENV === 'production' && {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'element-ui': 'elementUI',
      'axios': 'axios',
      'marked': 'marked',
      'highlight': 'hljs'
    }
  }
}