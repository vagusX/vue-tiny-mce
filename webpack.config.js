var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var devWebpackConfig = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: 'lib',
    filename: 'vue-tiny-mce.js',
    library: 'VueTinyMCE',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    alias: {
      _tinymce: path.resolve(__dirname, 'src/tinymce'),
    },
  },
  module: {
    loaders: [
      {
        test: /\/tinymce\/tinymce\.js$/,
        loader: 'imports?this=>window!exports?this.tinymce',
      }, {
        test: /\/tinymce\/.*?\/.*?\.js$/,
        loader: 'imports?global=_tinymce,this=>{tinymce:global.default}',
      }, {
        test: /\.js?$/,
        loader: 'babel',
        include: path.resolve(__dirname, 'src')
      }, {
        test: /\.css$/,
        exclude: /\/content\.min\.css$/,
        loader: 'style!css',
      }, {
        test: /\/content\.min\.css$/,
        loader: 'css',
      }, {
        test: /\.(gif|eot|ttf|woff|svg)$/,
        loader: 'url',
      }, {
        test: /\.txt$/,
        loader: 'raw',
      }
    ],
  },
  externals: [
    'vue'
  ],
};

var prodWebpackConfig = merge(devWebpackConfig, {
  output: {
    filename: 'vue-tiny-mce.min.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 15
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
})


module.exports = [
  devWebpackConfig,
  prodWebpackConfig
];
