import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


import { GC_AUTH_TOKEN } from './constants'
import { ApolloLink } from 'apollo-client-preset'


const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjh3aeru15lh20106030twfni' })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(GC_AUTH_TOKEN)
    const authorizationHeader = token ? `Bearer ${token}` : null
    operation.setContext({
        headers: {
            authorization: authorizationHeader
        }
    })
    return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

// 3
const client = new ApolloClient({
    link: httpLinkWithAuthToken,
    cache: new InMemoryCache()
})

// 4
ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>
    , document.getElementById('root')
)
registerServiceWorker()