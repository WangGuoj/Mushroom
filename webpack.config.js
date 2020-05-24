const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlplugin = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html'
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(jpg|png|gif|bmp|ttf|eot|woff|woff2|svg)$/, use: ['url-loader?limit=10000'] },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            preset: ['es2015']
          }
        }
      },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  },
  plugins: [htmlplugin, new VueLoaderPlugin()]
}
