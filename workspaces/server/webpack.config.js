/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;

/** @type {import("webpack").Configuration } */
module.exports = {
  entry: {
    bundle: './src/index.ts',
  },
  mode: NODE_ENV,
  target: 'node',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    // needed because discord.js doesnt resolve the default module field
    mainFields: ['main', 'module'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // needed because discord.js authors wont support webpack
          keep_classnames: true,
        },
      }),
    ],
  },
};
