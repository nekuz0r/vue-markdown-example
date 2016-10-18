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
      loaders: [
        { loader: 'babel' },
        {
          loader: 'ts',
          query: {
            transpileOnly: true,
            compiler: 'ntypescript',
            silent: true
          }
        }
      ],
    }]
  },
  externals: nodeExternals()
};
