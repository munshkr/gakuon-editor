const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: './build/bundle.js'
  },
  devtool: 'source-map',
  externals: {
    pico: 'Pico'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  plugins: [
    //new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    preLoaders: [
      { test: /\.tsx?$/, loader: 'tslint' }
    ],
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.js$/,
        include: [
          path.resolve(__dirname, 'node_modules/gakuon'),
          path.resolve(__dirname, 'node_modules/sid')
        ],
        loader: 'babel',
        query: { presets: ['es2015'] } }
    ]
  },
  devServer: {
    contentBase: './build'
  }
}
