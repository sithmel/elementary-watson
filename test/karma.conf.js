const path = require('path')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['./*.test.js'],
    reporters: ['mocha'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    preprocessors: {
      './*.test.js': [ 'webpack' ]
    },
    // webpack configuration
    webpack: {
      optimization: { minimize: false },
      resolve: {
        extensions: ['.js']
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            include: [
              path.resolve(__dirname, '../src'),
              path.resolve(__dirname, '../test')
            ]
            // exclude: /node_modules/,
          }
        ]
      }
    },
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    }
  })
}
