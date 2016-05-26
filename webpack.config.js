const webpack = require('webpack')
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin')

module.exports = {
  entry: "./src/js/index.js",
  output: {
    library: 'linuxDash',
    filename: 'linuxDash.min.js',
    path: './app',
  },
  devtool: 'eval',

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        loader: 'babel',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [

    new ngAnnotatePlugin({
      add: true,
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      exclude: /(angular|smoothie)/,
    }),

    new webpack.optimize.DedupePlugin()
  ]
}
