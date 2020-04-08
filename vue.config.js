// 给webpack打包编译用的、具体看官方文档vue-cli的参考配置
// 注意:这里的配置只是本地启动node服务器才有效,若部署到服务器上,要重新配置nginx才有效
module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'my-webico.png',
      favicon16: 'my-webico.png',
      appleTouchIcon: 'my-webico.png',
      maskIcon: 'my-webico.png',
      msTileImage: 'my-webico.png'
    }
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    // 接口代理,即路径是自己写的路径,但会根据自己设置代理到别的网站url上
    proxy: {
      // url中带/api的，如xxx:8080/api/xx，会被拦截转到访问target这个路径下
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        // 将url中/api去掉，
        // 即输入：localhost:8080/api/product 会变成 http://mall-pre.springboot.cn:8080/product
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // publicPath: '/app', //url子目录，即访问项目为：http://localhost:8080/app#/index
  // outputDir: 'dist',  //cnpm run build打包到名叫dist的文件夹中
  // indexPath: 'index2.html', //打包的页面取名为index2.html
  // lintOnSave: false, // 关闭ESLint的代码检查：
  productionSourceMap: false, // 设为false：打包后部署在Sources中搜索不到main.js(即看不到源码)，更安全
  chainWebpack: (config) => { // 删除预加载，防止重复加载
    config.plugins.delete('prefetch')
  }
}
