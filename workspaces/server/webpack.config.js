const path = require('path');
const { NODE_ENV = 'production' } = process.env;
module.exports = {
  entry: {
    bundle: './src/index.ts',
  },
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
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
