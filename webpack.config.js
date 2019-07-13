const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require('webpack-node-externals');

const { NODE_ENV = 'production' } = process.env;
module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: NODE_ENV === 'development' && ['npm run post']
    })
  ],
  watch: NODE_ENV === 'development',
  externals: [nodeExternals()],
    entry: './index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  context: path.resolve(__dirname, 'src'),

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      service: path.resolve(__dirname, 'src/service'),
      lib: path.resolve(__dirname, 'src/lib')
    }
  }
};
