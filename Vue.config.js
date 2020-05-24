
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 80,
    open: true
  },
  chainWebpack: config => {
    config.resolve.alias
      // set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('src/assets')) // 用~开头导入路径，和别的有差别
      .set('common', resolve('./src/common'))
      .set('network', resolve('./src/network'))
      .set('views', resolve('./src/views'))
  }
}
