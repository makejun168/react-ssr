import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router'

import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';
import TestApi from '../views/test/api-test';

// exact 只有是 / 才会匹配到
// 整个路由都等于 / 才会匹配到

export default () => [
  <Route path="/" key="home" render={() => <Redirect to="/list" />} component={TopicList} exact />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail" component={TopicDetail} key="detail" />,
  <Route path="/test" component={TestApi} key="test"/>
]
