const path = require('path');

module.exports = {
  entry: './public/js/index.js',
  mode: 'development',
  watchOptions: {
    ignored: /node_modules/
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/dist')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
