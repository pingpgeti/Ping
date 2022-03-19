import { PrismicLink } from 'apollo-link-prismic';
import {
  InMemoryCache,
} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import fetch from 'cross-fetch';

const client = new ApolloClient({
  link: PrismicLink({
    uri: 'https://suskatest.prismic.io/graphql',
    fetch: fetch
  }) as any,
  cache: new InMemoryCache(),
});

export { client };