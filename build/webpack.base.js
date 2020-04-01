const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public'
  },
  module: {
    // test 检查文件 是否使用规则 babel-loader 编译 es6 7 8
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      }
    ]
  }
}
