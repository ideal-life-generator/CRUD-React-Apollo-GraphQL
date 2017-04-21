import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import './styles/index.scss';

const { env: { NODE_ENV } } = process;

const $app = document.getElementById('app');

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({ networkInterface });

function renderApp(NextApp) {
  render(
    <AppContainer>
      <ApolloProvider client={client}>
        <Router>
          <NextApp />
        </Router>
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
