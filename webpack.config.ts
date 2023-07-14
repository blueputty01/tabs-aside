import type { EntryObject } from 'webpack';
import type { WebpackConfigFunction } from './webpack.types';

const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CrxLoadScriptWebpackPlugin = require('@cooby/crx-load-script-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const pages = ['app', 'options'];

const generateConfig: WebpackConfigFunction = (env: any, options: any) => {
  const isDev = options.mode === 'development';
  const iconPath = `./src/shared/img/branding/${isDev ? 'dev' : 'prod'}/`;

  const constEntries: EntryObject = isDev
    ? {
        background: './src/shared/utils/background.ts',
      }
    : {};

  const reactEntries = pages.reduce((config: EntryObject, page: string) => {
    config[page] = `./src/${page}/index`;
    return config;
  }, {});

  return {
    entry: {
      ...reactEntries,
      ...constEntries,
      vendors: ['react', 'react-dom', 'react-refresh/runtime'],
    },
    devtool: isDev ? 'inline-source-map' : 'source-map',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './build'),
      clean: true,
    },
    optimization: {
      sideEffects: true,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        shared: path.resolve(__dirname, 'src/shared'),
        app: path.resolve(__dirname, 'src/app'),
        options: path.resolve(__dirname, 'src/options'),
      },
      plugins: [new TsconfigPathsPlugin({})],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [
                  isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.s?[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
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
            transform(content: Buffer, absoluteForm: string) {
              if (!isDev) return;

              const manifest = JSON.parse(
                content.toString()
              ) as chrome.runtime.ManifestV3;

              // HMR config
              manifest.permissions?.push('scripting');
              manifest.background = { service_worker: 'background.js' };

              // pretty print to JSON with two spaces
              const manifest_JSON = JSON.stringify(manifest, null, 2);
              return manifest_JSON;
            },
          },
          {
            from: iconPath,
            to: './',
          },
        ],
      }),
      ...(isDev
        ? [
            new webpack.HotModuleReplacementPlugin(),
            // new CrxLoadScriptWebpackPlugin(),

            new ReactRefreshWebpackPlugin({
              overlay: false,
            }),
          ]
        : []),
    ]
      .concat(
        pages.map(
          (page) =>
            new HtmlWebpackPlugin({
              inject: true,
              template: `./src/${page}/index.html`,
              filename: `${page}.html`,
              chunks: [page],
            })
        )
      )
      .filter(Boolean),
    devServer: {
      /**
       * We need devServer write files to disk,
       * But don't want it reload whole page because of the output file changes.
       */
      static: true,
      /**
       * Set WebSocket url to dev-server, instead of the default `${publicPath}/ws`
       */
      client: {
        webSocketURL: 'ws://localhost:8080/ws',
      },
      /**
       * The host of the page of your script extension runs on.
       * You'll see `[webpack-dev-server] Invalid Host/Origin header` if this is not set.
       */
      allowedHosts: ['web.whatsapp.com'],
      devMiddleware: {
        /**
         * Write file to output folder /build, so we can execute it later.
         */
        writeToDisk: true,
      },
    },
  };
};

export default generateConfig;
