// webpack.config.js

// module import
const path = require("path");
const webpack = require("webpack");
require("dotenv").config();

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CnameWebpackPlugin = require("cname-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.[hash].js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ["/node_modules/"],
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/i,
        loader: "@svgr/webpack",
        options: {
          name: "[path][name].[ext]",
          outputPath: "resources/images",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new CnameWebpackPlugin({
      domain: "hiio420.com",
    }),
    new webpack.DefinePlugin({}),
  ],
  resolve: {
    extensions: [".js", ".json", ".wasm"],
    alias: {
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@resources": path.resolve(__dirname, "src", "resources"),
      "@components": path.resolve(__dirname, "src", "components"),
    },
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  devtool: "source-map",
};