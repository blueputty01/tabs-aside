import type { WebpackConfigFunction } from './webpack.types';

const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const pages = ['app', 'options'];

const generateConfig: WebpackConfigFunction = (env: any, options: any) => {
  const prod = options.mode === 'production';
  const iconPath = `./src/shared/img/branding/${prod ? 'prod' : 'dev'}/`;

  return {
    entry: pages.reduce((config: { [key: string]: string }, page: string) => {
      config[page] = `./src/${page}/index`;
      return config;
    }, {}),
    devtool: prod ? 'source-map' : 'inline-source-map',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './build'),
      clean: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        shared: path.resolve(__dirname, 'src/shared'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                modules: {
                  // getLocalIdent: getCSSModuleLocalIdent,
                  localIdentName: '[name]_[local]_[hash:base64]',
                },
                importLoaders: 2,
                sourceMap: true,
              },
            },
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      // @ts-ignore
      new TsconfigPathsPlugin({
        /* options: see below */
      }),
      // @ts-ignore
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
          {
            from: './src/shared/img/icons',
            to: './img/icons',
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

export default generateConfig;
