const resolve = dir => require('path').join(__dirname, dir)
const timestamp = new Date().getTime() // 获取一个时间戳

// 基础路径 注意发布之前要先修改这里
const baseUrl = '/'
module.exports = {
  publicPath: baseUrl, // 根据你的实际情况更改这里
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    https: false,
    hot: false, // 热加载
    port: 8086, // 端口
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/style/variables.scss";'
      },
      less: {
        modifyVars: {
          hack: 'true; @import "~@/style/vant-theme.less";'
        }
      }
    }
  },
  configureWebpack: config => {
    config.output.filename = `js/[name].[hash].${timestamp}.js`
    config.output.chunkFilename = `js/[name].[hash].${timestamp}.js`
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Syllabary'
        return args
      })

    config.plugins.delete('prefetch')

    // 重新设置 alias
    config.resolve.alias
      .set('@', resolve('src'))

    // 忽略的打包文件
    config.externals({
      // 'echarts': 'echarts'
    })
    //
    // const entry = config.entry('app')
    // entry
    //   .add('babel-polyfill')
    //   .end()
    // entry
    //   .add('classlist-polyfill')
    //   .end()
  }
}
