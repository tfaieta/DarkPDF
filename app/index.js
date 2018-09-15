import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();

render(
  <AppContainer>
    <div style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center'}}>
      <h1 style={{textAlign: 'center'}}>
        Welcome to DarkPDF
      </h1>
    </div>  
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
