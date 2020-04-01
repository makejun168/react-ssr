const express = require('express')
const fs = require('fs')
const path = require('path')
const ReactSSR = require('react-dom/server')
const isDev = process.env.NODE_ENV === 'development' // 判断是否是开发环境 或者 生产环境

const app = express()

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
