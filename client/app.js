import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader';
import App from './views/App';
import appState from './store/app.state'

const root = document.getElementById('root');
ReactDOM.hydrate(<App />, root);

const render = (Component) => {
	const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
	renderMethod(
    <AppContainer>
      <Provider appState={appState}>
	  	<Component />
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App);

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    // global require
    const NextApp = require('./views/App.jsx').default;
    // ReactDOM.hydrate(<NextApp/>, document.getElementById('root'));
    render(NextApp);
  })
}
