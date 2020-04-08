const path = require('path');
const axios = require('axios');
const webpack = require('webpack');
const { createProxyMiddleware } = require('http-proxy-middleware');
const MemoryFs = require('memory-fs');
const ReactDOMServer = require('react-dom/server');
let serverBundle
const serverConfig = require('../build/webpack.server.js');

const getTemplate = () => (
    new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
    })
)

const Module = module.constructor;

const mfs = new MemoryFs;
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;

// 监听打包过程中 bundle 将
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err));
    stats.warnings.forEach(warn => console.log(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )

    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    const m = new Module();
    m._compile(bundle, 'server-entry.js');
    serverBundle = m.exports.default;
})

module.exports = function (app) {
    // 将 8888 端口的 js代码 代理到 3333 端口中获取
    app.use('/public', createProxyMiddleware({
        target: 'http://localhost:8888'
    }));

    app.get('*', function (req, res) {
        getTemplate().then(template => {
            const content = ReactDOMServer.renderToString(serverBundle);
            res.send(template.replace('<!-- app -->', content));
        })
    });
}
