require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

module.exports = withPlugins([[withSass], [withCss]], {
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  xPoweredBy: false,
  // target: 'serverless',
  webpack: (config, {}) => {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    });

    // Webpack environment variable config
    // console.log(config.plugins);
    config.plugins = config.plugins || [];
    config.plugins.push(
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    );

    return config;
  }
});
