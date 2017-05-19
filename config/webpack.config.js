const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: './server/server.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: [/ngx-|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-/]
    })
  ],
  node: {
    __dirname: true
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: 'node_modules' }
    ]
  }
};
