const { resolve } = require("path");

const TerserPlugin = require("terser-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: "./test/index.ts",
  mode: "production",
  output: {
    path: resolve(__dirname, "./build"),
    filename: "[name].[hash:6].js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      })
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' },
      }
    }
  },
  plugins: [
    new HtmlPlugin({
      title: "Nets",
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin()
  ]
}
