const path = require('path') // 导入Node.js的path模块\
const webpack = require('webpack')
// 使用绝对路径 避免错误
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development' // 判断是否是开发环境 或者 生产环境

const config = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
    // vendor: path.join(__dirname. '../node_modules')
  },
  output: {
    filename: '[name].[hash].js', // 中括号代表的是 变量名称 name 对应 app hash 代表算出来的hash值,
    path: path.join(__dirname, '../dist'), // 生成出来的文件 存放位置在哪里 一般存放在dist 文件夹中,
    publicPath: '/public/' // 公共资源路径 一般使用cdn的时候 才会使用 区分API请求 还是静态资源 静态资源部署到CDN 有用
  },
  module: {
    // test 检查文件 是否使用规则 babel-loader 编译 es6 7 8
    rules: [
      {
        enforce: 'pre',
        test: /.(jsx|js)$/,
        loader: 'eslint-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
  // 最简单的配置
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
}

// 在 dist 目录下面 contentBase
// localhost:8888/filename

// historyApiFallback 是否重定向到页面的根目录 index

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 可以使用任何方式进行访问 可以使用本机访问,
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    // hot: true,
    historyApiFallback: {
      index: '/public/index.html'
    },
    overlay: {
      errors: true
    }
  },
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
