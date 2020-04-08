import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom'
import Routes from '../config/route'


export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        {/* <div>
          <Link to="/list">首页</Link>
          <br />
          <Link to="/detail">详情页</Link>
        </div> */}
        <Routes />
      </BrowserRouter>
    )
  }
}
