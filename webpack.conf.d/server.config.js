const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  node: {
    __dirname: false
  },
  entry: './src/server.js',
  output: {
    filename: 'server.js',
    path: './build/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        { loader: 'babel' },
        { loader: 'ts' }
      ],
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
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
  externals: nodeExternals()
};
