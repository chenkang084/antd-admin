const path = require('path')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, ''),
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  "theme": "./theme.config.js",
  // 接口代理示例
  "proxy": {
    "/api": {
      "target": "http://10.104.208.19:8888/",
      // "target": "http://10.96.204.208:8888/",
      // "target": "http://10.96.207.217:8888/",
      // "target": "http://localhost:8888/",
      "changeOrigin": true,
      secure: false,
      // "pathRewrite": { "^/apinew" : "" }
    },
  },
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", {"libraryName": "antd", "style": true}]
      ],
      "devtool": 'cheap-module-source-map',
      "port": 4000
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", {"libraryName": "antd", "style": true}]
      ]
    }
  },
  "dllPlugin": {
    "exclude": [
      "babel-runtime"
    ],
    "include": [
      "dva/router",
      "dva/saga",
      "dva/fetch",
      "dva",
      "babel-polyfill",
      "dva-loading"
    ]
  }
}
