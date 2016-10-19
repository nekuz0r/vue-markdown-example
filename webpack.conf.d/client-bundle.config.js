const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: './src/client-entry.js',
  output: {
    filename: 'client-bundle.js',
    path: './build/dist/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
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
              importLoaders: 1
              //localIdentName: '[path][name]---[local]---[hash:base64:5]'
            }
          },
          { loader: 'postcss' },
          { loader: 'sass' }
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
        postcss: [
          require('postcss-autoreset')({
            reset: {
              boxSizing: 'border-box'
            }
          }),
          require('postcss-initial')(),
          require('autoprefixer')
        ]
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"dev"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
