const axios = require('axios');

const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
	const path = req.path;
	// 未登陆的情况下 user 为空
	const user = req.session.user || {}
	const needAccessToken = req.query.needAccessToken

	if (needAccessToken && user.accessToken) {
		res.status(401).send({
			success: false,
			msg: 'need login'
		})
	}

	const query = Object.assign({}, req.query)
	if (query.needAccessToken) delete query.needAccessToken
	// form data方式请求
	axios(`${baseUrl}${path}`, {
		method: req.method,
		params: query,
		data: Object.assign({}, req.body, {
			accesstoken: user.accessToken
		}),
		headers: {
			'content-type': 'application/x-www-form-urlencode'
		}
	}).then(resp => {
		if (resp.status === 200) {
			res.send(resp.data);
		} else {
			res.status(resp.status).send(resp.data)
		}
	}).catch(err => {
		console.log(err);
		if (err.response) {
			res.status(500).send(err.response.data)
		} else {
			res.status(500).send({
				success: false,
				msg: '未知错误'
			})
		}
	})
}
