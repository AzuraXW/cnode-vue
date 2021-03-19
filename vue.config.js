module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'docs',
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
  configureWebpack: config => {
    // 利用环境变量进行判断是否是生产环境production
    if (process.env.NODE_ENV === 'production') {
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        'element-ui': 'elementUI',
        axios: 'axios',
        marked: 'marked',
        highlight: 'hljs'
      }
    }
  }
}
