const path = require('path');
require('@babel/register');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    // exclude node's internal libraries and node_modules from bundling
    // they're still accessible through 'require'
    target: 'node',
    externals: [nodeExternals()],

  entry: "./client/index.jsx",
  module: {
    rules: [
      // JS sources - server and client
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
          },
        // CSS sources
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
    },
  // bundling
  output: {
    path: path.resolve(__dirname + "./client/dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  // Plugins
  plugins: [
    new htmlWebpackPlugin({
      template: "./client/index.html",
        filename: "index.html",
      inject:"body",
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin()
    ],
   // Reload On File Change
    watch: true,
    // Development Tools (Map Errors To Source File)
    devtool :'source-map',

  devServer: {
    contentBase: "./client/dist",
    hot: true
  },



};
