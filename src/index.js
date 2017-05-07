import React, { Component } from 'react';
import { func, element } from 'prop-types';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
// import { persistStore } from 'redux-persist';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import client from './client';
import store from './store';

const { env: { NODE_ENV } } = process;

const $app = document.getElementById('app');

// persistStore(store, { blacklist: ['apollo'] });

class Context extends Component {
  static propTypes = {
    children: element.isRequired,
  };

  static childContextTypes = {
    insertCss: func.isRequired,
  };

  getChildContext = () => ({
    insertCss: (...insertedStyles) => {
      // eslint-disable-next-line no-underscore-dangle
      const removeCss = insertedStyles.map(x => x._insertCss());

      return () => { removeCss.forEach(f => f()); };
    },
  });

  render = () => this.props.children;
}

function renderApp(NextApp) {
  render(
    <AppContainer>
      <ApolloProvider client={client} store={store}>
        <BrowserRouter>
          <Context>
            <NextApp />
          </Context>
        </BrowserRouter>
      </ApolloProvider>
    </AppContainer>,
    $app,
  );
}

if (NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      const { default: NextApp } = require('./containers/App');

      renderApp(NextApp);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp(App);
});
