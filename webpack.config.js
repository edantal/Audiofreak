var path = require('path');

module.exports = {
  entry: {
    app: './app/assets/js/app.js',
    vendor: "./app/assets/js/vendor.js"
  },
  output: {
    path: path.resolve(__dirname, './app/js/'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}