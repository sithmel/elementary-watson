const path = require('path')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['./*.test.js'],
    reporters: ['dots', 'BrowserStack'],
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
              path.resolve(__dirname, '../lib'),
              path.resolve(__dirname, '../test')
            ],
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [['@babel/preset-env', { modules: false }]],
                plugins: [
                  '@babel/plugin-transform-runtime'
                ]
              }
            }
          }
        ]
      }
    },
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },
    // define browsers
    customLaunchers: {
      bs_chrome_win: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '75',
        os: 'WINDOWS',
        os_version: '10'
      },
      bs_chrome_mac: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '75',
        os: 'OS X',
        os_version: 'Mojave'
      },
      bs_safari_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '12.1',
        os: 'OS X',
        os_version: 'Mojave'
      },
      bs_ie_win: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11',
        os: 'WINDOWS',
        os_version: '10'
      },
      bs_edge_win: {
        base: 'BrowserStack',
        browser: 'edge',
        browser_version: '18',
        os: 'WINDOWS',
        os_version: '10'
      },
      bs_iphone7: {
        base: 'BrowserStack',
        device: 'iPhone 7',
        os: 'ios',
        os_version: '10.0',
        captureTimeout: 120
      },
      bs_android: {
        base: 'BrowserStack',
        device: 'Google Pixel 2',
        os: 'Android',
        os_version: '9.0',
        captureTimeout: 120
      }
    },
    browsers: [
      'bs_chrome_win',
      'bs_chrome_mac',
      'bs_safari_mac',
      'bs_ie_win',
      'bs_edge_win',
      'bs_iphone7'
      // 'bs_android'
    ],
    singleRun: true
  })
}
