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
        ]
      }, {
        test: /\.s?css$/,
        loaders: [
          { loader: 'node-style' },
          {
            //loader: 'css/locals',
            loader: 'css',
            query: {
              modules: true,
              camelCase: true,
              importLoaders: true,
              localIdentName: '[path][name]---[local]---[hash:base64:5]'
            }
          },
          {
            loader: 'postcss',
            options: {
              plugins: function () {
                return [
                  require('postcss-autoreset')({
                    reset: {
                      boxSizing: 'border-box'
                    }
                  }),
                  require('postcss-initial')(),
                  require('autoprefixer')
                ];
              }
            }
          },
          { loader: 'sass' }
        ]
      }
    ]
  },
  externals: nodeExternals({
    whitelist: [ /^node-style-loader/ ]
  })
};
