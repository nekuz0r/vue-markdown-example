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
          { loader: 'node-style' },
          {
            loader: 'css',
            query: {
              modules: true,
              camelCase: true,
              importLoaders: 1
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
    new webpack.optimize.DedupePlugin()
  ],
  externals: nodeExternals({
    whitelist: [ /^node-style-loader/ ]
  })
};
