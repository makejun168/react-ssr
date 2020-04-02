import React from 'react';
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/app.state'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // do some
  }

  render() {
    const { appState } = this.props
    const { msg } = appState
    return (
      <div>{msg}</div>
    )
  }
}


TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}
