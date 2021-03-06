const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const path = require('path');

const config = {
  entry: path.join(__dirname, './src/main.ts'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, './dist')
  },
  devtool: false, // To be changed based on `argv.mode`. See `module.exports` function.
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true,
              failOnHint: true,
              typeCheck: true,
              tsConfigFile: path.join(__dirname, './tsconfig.json'),
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin([
      path.join(__dirname, './dist')
    ]),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    })
  ],
  devServer: {
    hot: true
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  } else {
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false
        })
      ]
    };
  }

  return config;
};
