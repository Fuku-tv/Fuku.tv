// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const { NODE_ENV = 'production' } = process.env;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const slsw = require('serverless-webpack');

/** @type {import("webpack").Configuration } */
module.exports = {
  entry: slsw.lib.entries,
  mode: NODE_ENV,
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
};
