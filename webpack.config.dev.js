const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");

const utils = require("./utils");

utils.makePagesListJson();

module.exports = merge(config, {
  mode: "development",
});
