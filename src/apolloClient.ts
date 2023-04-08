import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "http://localhost:8080/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add authorization header
  localStorage.getItem("token") &&
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: localStorage.getItem("token") || null,
      },
    }));

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default client;
