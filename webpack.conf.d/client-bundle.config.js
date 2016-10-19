const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: './src/client-entry.js',
  output: {
    filename: 'client-bundle.js',
    path: './build/dist/'
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
          { loader: 'style' },
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
          silent: true
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"dev"'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
};
