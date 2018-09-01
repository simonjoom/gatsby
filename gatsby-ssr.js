/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import 'isomorphic-fetch'
import React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { renderToString } from 'react-dom/server'
import { AsyncStorage, AppRegistry } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, Observable } from 'apollo-link'
import StorageKeys from './statics/storage-keys'

//const preferDefault = m => (m && m.default) || m
//exports.pathPrefix='/gatsby-starter-blog';
//exports.wrapRootElement = preferDefault(require(`./inject-provider-ssr`))

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
  const state = { apollo: ssrClient.cache.extract() }
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

  return new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([requestLink]),
    cache: new InMemoryCache(),
    connectToDevTools: false,
  })
}

const apolloClient = setupApolloClient()
export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={apolloClient}>{element}</ApolloProvider>
)

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  let SecondWrap = wrapRootElement({ element: bodyComponent })
  return new Promise(resolve => {
    try {
        class App extends React.Component {
            render() {
              return SecondWrap;
            }
          }

      return getDataFromTree(SecondWrap).then(() => {
     //   console.log('getDataFromTree')
        AppRegistry.registerComponent('App', () => App)
        const { element, getStyleElement } = AppRegistry.getApplication('App')
       // console.log('test', element)
        const styleElement = getStyleElement()
        const html = renderToString(element)
        // renders ApolloQueries to string and then inserts it into the page
        replaceBodyHTMLString(html)
        // sets head components with styled components and apollo state
        setHeadComponents([makeApolloState(apolloClient), styleElement])
        resolve()
      })
    } catch (error) {
      console.log('error', error)
      // Prevent Apollo Client GraphQL errors from crashing SSR.
      // Handle them in components via the data.error prop:
      // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
    }
  }).catch(error => {
    console.log('error', error)
  })
  // See https://github.com/necolas/react-native-web/blob/master/website/guides/getting-started.md#server-side-rendering
}

// eslint-disable-next-line react/prop-types,react/display-name
