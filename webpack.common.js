const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(this.mode);

module.exports = {
  entry: './src/popup.jsx',
  devtool: 'inline-source-map',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/build/',
    filename: 'bundle.js',
    clean: true,
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/popup.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/manifest.json',
          to: 'manifest.json',
        },
      ],
    }),
  ],
};
