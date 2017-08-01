import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import chalk from 'chalk';
// import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import App from './containers/App';
import client from './client';
import store from './store';
import { serverPort } from './config';
// import routes from './routes';

const app = new Express();

app.use((req, res) => {
  const css = new Set();

  const context = { insertCss: (...styles) => console.log(styles) || styles.forEach(style => css.add(style._getCss())) };

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <ApolloProvider client={client} store={store}>
        <App />
      </ApolloProvider>
    </StaticRouter>,
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });

    res.end();
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
      <style type="text/css">${[...css].join('')}</style>

      <script src="http://localhost:3000/packages.js"></script>
      <script src="http://localhost:3000/client.js"></script>
    `);

    res.end();
  }
});

app.listen(serverPort, () => console.info(chalk.green(`React app is listening on localhost:${serverPort}`)));
