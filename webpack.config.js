const path = require('path');
require('@babel/register');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const nodeExternals = require('webpack-node-externals');

module.exports = {
    // exclude node's internal libraries and node_modules from bundling
    // they're still accessible through 'require'
    // target: 'node',
    // externals: [nodeExternals()],
  entry: "./client/index.jsx",
  output: {
    path: path.resolve(__dirname + "/public/dist/"),
    publicPath:"/",
    filename: "bundle.js"
  },
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [
      // JS sources - server and client
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ["style-loader", {
          loader: MiniCssExtractPlugin.loader}, "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
    },
  // bundling

  // Plugins
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
        inject:false,
    }),
    new MiniCssExtractPlugin({
      filename:"main.css"

    }),
    new webpack.HotModuleReplacementPlugin()
    ],
   // Reload On File Change
    watch: true,
    // Development Tools (Map Errors To Source File)
    devtool :'source-map',

  devServer: {
    contentBase: "./public/dist",
    hot: true
  },



};
