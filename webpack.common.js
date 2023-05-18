const path = require('path')

const package = require('./package.json')

const mainPaths = package.main.split('/')
const mainFile = mainPaths.pop()
const mainDir = mainPaths.join('/')

exports.mainFile = mainFile

module.exports = {
  context: __dirname,
  optimization: {},
  target: 'node',
  externals: [],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  plugins: [],
  output: {
    path: path.join(__dirname, mainDir),
    filename: mainFile,
  },
}