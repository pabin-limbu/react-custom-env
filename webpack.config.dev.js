const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development"; // this is important for bable plugin as it will know that we are running in development mode.

module.exports = {
  mode: "development", // so that the webpack will know to run on development mode, this sets the node envirponment to development and disable some porduction only features.
  target: "web",
  devtool: "cheap-module-source-map", // this will give us the source map for debugging. let us see our original code when debuggind in browser.
  entry: "./src/index", //specify the entry point
  output: {
    path: path.resolve(__dirname, "build"), // this is not going to write a file in build but in memory it will be serving from this directory.
    publicPath: "/", // this setting specifies the public url of the output directory when it is referenced to the browser.
    filename: "bundle.js", // physical file wont be generated for development but wwebpack require this value so that our html can reference the bundle thats been served from the memory.
  }, //webpack doesnt output code in development mode it only serves our app from memory.

  devServer: {
    // we will be using webpackk to server app anddevelopment too.
    // we will be serving our app through webpack and it can also be server trough express.
    stats: "minimal",
    overlay: true, // overrlay any error occour in the browser.
    historyApiFallback: true, //all request will be sent to index.html , this way we can load deep links and will all be handle via react-router.
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    //tell webpack which file to handle
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      { test: /(\.css)$/, use: ["style-loader", "css-loader"] }, // this will allow us to import css just like js and webpack will allow us to bundle all of our css into a single file.
    ],
  },
};
