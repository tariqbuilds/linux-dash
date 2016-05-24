const webpack = require('webpack')
const ngminPlugin = require("ngmin-webpack-plugin")

module.exports = {
  entry: "./js/index.js",
  output: {
    library: 'linuxDash',
    filename: 'linuxDash.min.js',
    path: './',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
     new ngminPlugin(),
     new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    })
  ]
}
