const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ['app', 'options'];

module.exports = (env, options) => {
  const iconPath = `./src/shared/img/branding/${
    options.mode === 'production' ? 'prod' : 'dev'
  }/`;

  return {
    entry: pages.reduce((config, page) => {
      config[page] = `./src/${page}/index`;
      return config;
    }, {}),
    devtool: 'inline-source-map',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './build'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
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
      new CopyPlugin({
        patterns: [
          {
            from: './src/manifest.json',
            to: 'manifest.json',
          },
          {
            from: iconPath,
            to: './',
          },
        ],
      }),
    ].concat(
      pages.map(
        (page) =>
          new HtmlWebpackPlugin({
            inject: true,
            template: `./src/${page}/index.html`,
            filename: `${page}.html`,
            chunks: [page],
          })
      )
    ),
  };
};
