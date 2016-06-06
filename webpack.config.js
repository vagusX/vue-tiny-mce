const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'editor'),
  entry: {
    app: './index.js',
  },
  output: {
    path: 'lib',
    filename: 'editor.js',
    library: 'MceVuEditor',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    alias: {
      _tinymce: path.resolve(__dirname, 'editor/tinymce'),
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
        include: path.resolve(__dirname, 'editor')
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
