"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  webpack = require("webpack"),
  _ = require("lodash"),
  env = _.trim(process.env.NODE_ENV),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  path = require("path"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  rootPath = path.resolve(__dirname);

module.exports = {
  devtool: "module-source-map",
  entry: {
    app: [
      rootPath + "/src/index.js" //唯一入口文件
    ]
  },
  output: {
    path: rootPath + "/dist", //打包后的文件存放的地方
    filename: "[name].[chunkhash:8].bundle.js", //打包后输出文件的文件名
    // publicPath: "./public",
    chunkFilename: "[name]-[id].[chunkhash:8].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: [path.resolve(rootPath, "./node_modules/")]
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        use: "url-loader?limit=8192&name=src/images/[name].[ext]"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader:
                "css-loader?sourceMap&importLoaders=1&localIdentName=[hash:base64:5]!postcss-loader"
            },
            "sass-loader"
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader:
                "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[hash:base64:5]!postcss-loader"
            },
            "less-loader"
          ]
        })
      },
      {
        test: /\.(svg)$/i,
        use: "svg-sprite-loader"
      }
    ]
  },
  devServer: {
    contentBase: rootPath + "/public/", //本地服务器所加载的页面所在的目录
    host: "0.0.0.0",
    port: 9000,
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    proxy: {
      "/api": {
        target: "http://10.104.209.111:8888/",
        // "target": "http://10.96.207.231:8888/",
        // "target": "http://10.96.207.217:8888/",
        // "target": "http://localhost:8888/",
        changeOrigin: true,
        secure: false
        // "pathRewrite": { "^/apinew" : "" }
      }
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "main.css",
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common" // Specify the common bundle's name.
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [require("autoprefixer")];
        }
      }
    }),
    new HtmlWebpackPlugin({
      //根据模板插入css/js等生成最终HTML
      filename: "./index.html", //生成的html存放路径，相对于 path
      template: rootPath + "/src/index.html", //html模板路径
      hash: true //为静态资源生成hash值
    }),
    // new webpack.DllReferencePlugin({
    //   context: rootPath,
    //   name: "vendor",
    //   manifest: require(path.resolve(
    //     rootPath,
    //     "./src/public/library/vendor-manifest.json"
    //   ))
    // }),
    new webpack.DefinePlugin({
      "process.env": "'" + env + "'"
    })
    // new CopyWebpackPlugin([
    //   {
    //     from: rootPath + "/src/public/",
    //     to: rootPath + "/dist"
    //   }
    // ])
  ],
  resolve: {
    modules: ["node_modules", path.join(rootPath, "./node_modules")],
    extensions: [".web.js", ".js", ".json", ".scss", ".css", ".less"]
  }
};
