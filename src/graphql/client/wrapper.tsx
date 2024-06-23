"use client";

import {
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

const graphQLServer = process.env.NEXT_PUBLIC_graphQLServer;
const graphQLServer2 = process.env.graphQLServer;
console.log("GRAPHQL SERVER", graphQLServer);
console.log("GRAPHQL SERVER2", graphQLServer2);

function makeClient() {
  const httpLink = new HttpLink({
    uri: graphQLServer || 'https://music.teknixco.net/api/v1/graphql',
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

/*
Resources
https://www.apollographql.com/blog/using-apollo-client-with-next-js-13-releasing-an-official-library-to-support-the-app-router
https://www.apollographql.com/blog/how-to-use-apollo-client-with-next-js-13
https://github.com/apollographql/apollo-client-nextjs/tree/main/packages
https://www.apollographql.com/docs/
 */