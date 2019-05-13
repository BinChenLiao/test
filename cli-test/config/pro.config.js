// 生产环境去掉注释
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let proConfig = new UglifyJsPlugin({
  uglifyOptions: {
    compress: {
      drop_console: true,
      drop_debugger: false,
      pure_funcs: ['console.log'] // 移除console
    },
    sourceMap: false,
    parallel: true
  }
})

module.exports = proConfig;