const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js',
  ],
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js', // relative to the outputPath (defaults to / or root of the site)
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'), //server your static files from here
    watchContentBase: true,
    proxy: [ // allows redirect of requests to webpack-dev-server to another destination
      {
        context: ['/api/tickle', '/api/test'],  // can have multiple
        target: 'http://localhost:8080', //server and port to redirect to
        secure: false,
      },
    ],
    port: 3000, // port webpack-dev-server listens to, defaults to 8080
    overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: false, // defaults to false
      errors: false, // defaults to false
    },
  },
}
