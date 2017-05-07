import { ApolloClient, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:5000/graphql',
  opts: { credentials: 'include' },
});

export default new ApolloClient({ networkInterface });
