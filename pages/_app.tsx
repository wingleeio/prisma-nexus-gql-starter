import { AppProps } from 'next/app'
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import 'antd/dist/antd.css';

function App({ Component, pageProps, apollo }: AppProps) {
  return <ApolloProvider client={apollo}><Component {...pageProps} /></ApolloProvider>
}

export default withApollo(({ initialState }) => new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache().restore(initialState ?? {}),
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
}))(App)