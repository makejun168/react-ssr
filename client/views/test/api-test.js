import React, { Fragment } from 'react';
import axios from 'axios'
const CircularJSON = require('circular-json');

export default class TestApi extends React.Component {
	login() {
		// axios.post('/cnode/accesstoken', {accesstoken: 'c154d7f6-a3da-452a-b898-00ea4ac46999'}, {'Content-Type': 'application/x-www-form-urlencoded'})
		// 	.then(res => {
		// 		console.log(res)
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})

		axios.post('/api/user/login', {accesstoken: 'c154d7f6-a3da-452a-b898-00ea4ac46999'} ).then(resp => {
			console.log(resp)
		}).catch(err => {
			console.log(err)
		})
	}

	getTopics() {
		axios.get('/api/topics').then(resp => {
			console.log(resp)
		})
	}

	markAll() {
		axios.post('/api/message/mark_all?needAccessToken=true').then(resp => {
			console.log(resp)
		}).catch(err => {
			console.log(err)
		})
	}

	render() {
		return (
			<Fragment>
				<button onClick={this.getTopics}>topics</button>
				<button onClick={this.login}>login</button>
				<button onClick={this.markAll}>markAll</button>
			</Fragment>
		)
	}
}
