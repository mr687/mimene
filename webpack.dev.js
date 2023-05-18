const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const NodeExternalsPlugin = require('webpack-node-externals')

const common = require('./webpack.common.js')

console.log('Webpack running on development')

module.exports = merge(common, {
  mode: 'development',
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  optimization: {
    minimize: false,
  },
  devtool: 'inline-source-map',
  externals: [
    NodeExternalsPlugin({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
    }),
    new RunScriptWebpackPlugin({ name: common.mainFile, autoRestart: true, restartable: true, keyboard: true }),
  ],
})