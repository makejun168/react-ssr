const path = require('path'); // 导入Node.js的path模块
// 使用绝对路径 避免错误

module.exports = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js', // 中括号代表的是 变量名称 name 对应 app hash 代表算出来的hash值,
        path: path.join(__dirname, '../dist'), // 生成出来的文件 存放位置在哪里 一般存放在dist 文件夹中,
        publicPath: '', // 公共资源路径 一般使用cdn的时候 才会使用 区分API请求 还是静态资源 静态资源部署到CDN 有用
    }
}
