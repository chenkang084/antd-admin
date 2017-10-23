var webpack = require('webpack')

module.exports = (webpackConfig, env) => {

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'env': "'" + env + "'",
  }))

  return webpackConfig
}
