import React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { renderToString } from 'react-dom/server'
import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, Observable } from 'apollo-link'
//import { ApolloClient, InMemoryCache, HttpLink, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws'
//import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities'

import StorageKeys from './statics/storage-keys'
//require('dotenv').config()
let cachedToken = ''
let pathbackend = 'http://ns327841.ip-37-187-112.eu/graphql/'
let uriwebsocket = 'ws://ns327841.ip-37-187-112.eu/subscriptions'
//+process.env.REACT_APP_ENDPOINT;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  pathbackend = 'http://localhost:4000/graphql/'
  uriwebsocket = 'ws://localhost:4000/subscriptions'
}

async function getAuthorizationToken() {
  const token = cachedToken
    ? cachedToken
    : await AsyncStorage.getItem(StorageKeys.GC_TOKEN)

  cachedToken = token

  return token
}
function makeApolloState(ssrClient) {
console.log("makeApolloState")
  const state = { apollo: ssrClient.getInitialState() }
  // appends apollo state to the global client window object
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
          /</g,
          `\\u003c`
        )};`,
      }}
    />
  )
}

export function setupApolloClient() {
  const connectionParams = async () => {
    return {}
    //const token = await getAuthorizationToken();
    //return token ? { authorization: `Bearer ${token}` } : {};
  }

  const httpLink = new createHttpLink({
    uri: pathbackend,
  })
  /*
    const authMiddleware = setContext(
      (_, { headers }) =>
        new Promise(async resolve => {
          // get the authentication token from local storage if it exists
          const token = await getAuthorizationToken();
  
          cachedToken = token;
  
          // return the headers to the context so httpLink can read them
          resolve({
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : null,
            },
          });
        }),
    );*/
  // const httpLinkWithAuth = authMiddleware.concat(httpLink);

  const request = oper => {
    //const token = await getAuthorizationToken();
    //const authorizationHeader = token ? `Bearer ${token}` : null
    oper.setContext({
      headers: connectionParams,
    })
  }

  const middlewareAuthLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            })
          })
          .catch(observer.error.bind(observer))

        return () => {
          if (handle) handle.unsubscribe()
        }
      })
  )

  const requestLink = httpLink
  /*
  const isUpload = ({ variables }) => Object.values(variables).some(isFile)

  const terminalLink = process.browser
    ? split(isUpload, UploadLink, requestLink)
    : requestLink*/

  return new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([requestLink]),
    cache: new InMemoryCache(),
    connectToDevTools: false,
  })
}

const apolloClient = setupApolloClient()

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) =>
  new Promise(resolve => {
    const ApolloQueries = (
      <ApolloProvider client={apolloClient}>{bodyComponent}</ApolloProvider>
    )
      
    return getDataFromTree(ApolloQueries).then(() => {
      console.log("getDataFromTree")
      // renders ApolloQueries to string and then inserts it into the page
      replaceBodyHTMLString(renderToString(ApolloQueries))
      // sets head components with styled components and apollo state
      setHeadComponents([makeApolloState(apolloClient)])
      resolve()
    })
  })

// eslint-disable-next-line react/prop-types,react/display-name
export default ({ element }) => (
  <ApolloProvider client={apolloClient}>{element}</ApolloProvider>
)
