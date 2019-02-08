import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, InMemoryCache } from 'apollo-boost';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache(),
});

const ui = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
const mountTo = document.getElementById('root');

render(ui, mountTo);

serviceWorker.register();
