const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  node: {
    __dirname: false
  },
  entry: './src/server-entry.js',
  output: {
    filename: 'server-bundle.js',
    path: './build/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [ { loader: 'eslint' } ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel' },
          { loader: 'ts' }
        ]
      }, {
        test: /\.s?css$/,
        use: [
          { loader: 'node-style' },
          {
            loader: 'css',
            query: {
              modules: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[path][name]---[local]---[hash:base64:5]'
            }
          },
          { loader: 'postcss' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.s?css$/,
      options: {
        context: __dirname,
        postcss: function (webpack) {
          return [
            require('postcss-import')({
              addDependencyTo: webpack,
              plugins: [
                require("stylelint")({ /* your options */ })
              ]
            }),
            require('postcss-each'),
            require('postcss-simple-vars'),
            require('postcss-nested'),
            require('postcss-autoreset')({
              reset: {
                boxSizing: 'border-box'
              }
            }),
            require('postcss-initial')(),
            require('autoprefixer'),
            require("postcss-reporter")({
              clearMessages: true,
              throwError: true
            })
          ];
        }
      }
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.jsx?$/,
      options: {
        ts: {
          transpileOnly: true,
          compiler: 'ntypescript',
          silent: true
        }
      }
    }),
    new webpack.optimize.DedupePlugin()
  ],
  externals: nodeExternals({
    whitelist: [ /^node-style-loader/ ]
  })
};
