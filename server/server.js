const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const favicon = require('serve-favicon')
const ReactSSR = require('react-dom/server')
const isDev = process.env.NODE_ENV === 'development' // 判断是否是开发环境 或者 生产环境

const app = express()

// 转化为 json 数据
app.use(bodyParser.json())
// 对应 post 请求的 formData 统一转化为 req.body
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
	maxAge: 10 * 60 * 1000,
	name: 'tid',
	resave: false,
	saveUninitialized: false,
	secret: 'kobe-bryant'
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res) {
    // console.log(serverEntry);
    const appStr = ReactSSR.renderToString(serverEntry)
    template.replace('<app></app>', appStr)
    res.send(template.replace('<app></app>', appStr))
  })
} else {
  const devStatic = require('../util/dev-server')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('server is running in port 3333')
})
