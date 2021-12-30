const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './src/img/branding/dev/',
          to: 'img/',
        },
      ],
    }),
  ],
});
