const path = require('path') // 导入Node.js的path模块
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
// 使用绝对路径 避免错误
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development' // 判断是否是开发环境 或者 生产环境

const config = webpackMerge(baseConfig, {
  // 打包后的运行环境
  mode: 'none',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
    // vendor: path.join(__dirname. '../node_modules')
  },
  // [name].[hash]
  output: {
    filename: 'server-entry.js', // 中括号代表的是 变量名称 name 对应 app hash 代表算出来的hash值,
    path: path.join(__dirname, '../dist'), // 生成出来的文件 存放位置在哪里 一般存放在dist 文件夹中,
    publicPath: '/public', // 公共资源路径 一般使用cdn的时候 才会使用 区分API请求 还是静态资源 静态资源部署到CDN 有用
    libraryTarget: 'commonjs2' // commonjs 的模块加载方案
  },
  // 最简单的配置
  plugins: [
    // new HTMLPlugin()
  ]
})

module.exports = config
