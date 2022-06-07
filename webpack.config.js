// webpack.config.js

// module import
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".wasm"],
  },
  devServer: {
    hot: true,
  },
  devtool: "source-map",
};
