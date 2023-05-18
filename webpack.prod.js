

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { merge } = require('webpack-merge')
const NodeExternalsPlugin = require('webpack-node-externals')

const common = require('./webpack.common.js')

console.log('Webpack running on production')

module.exports = merge(common, {
  mode: 'production',
  entry: ['./src/main.ts'],
  optimization: {
    nodeEnv: 'production',
    minimize: true,
    chunkIds: 'deterministic',
    concatenateModules: true,
    flagIncludedChunks: true,
    mangleExports: true,
    mangleWasmImports: true,
  },
  devtool: false,
  externals: [
    NodeExternalsPlugin(),
  ],
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
})