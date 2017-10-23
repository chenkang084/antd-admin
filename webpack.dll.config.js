"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  webpack = require("webpack"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  path = require("path"),
  rootPath = path.resolve(__dirname);

module.exports = {
  entry: {
    vendor: ["react", "react-dom"]
  },
  output: {
    path: rootPath + "/public/library", //打包后的文件存放的地方
    filename: "vendor.dll.js", //打包后输出文件的文件名
    library: "vendor"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: [path.resolve(__dirname, "./node_modules/*")]
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        use: "url-loader?limit=8192&name=src/images/[name].[ext]"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("main.css"),
    new CleanWebpackPlugin([rootPath + "/public/library/*"]),
    new webpack.DllPlugin({
      path: path.resolve(rootPath, "./public/library/[name]-manifest.json"),
      name: "[name]"
    })
  ],
  resolve: {
    modules: ["node_modules", path.join(rootPath, "./node_modules")],
    extensions: [".web.js", ".js", ".json"]
  }
};
