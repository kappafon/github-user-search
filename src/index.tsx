import 'core-js/stable'
import React from 'react'
import ReactDom from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import Login from './containers/login'
import App from './containers/app'

const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
    }
`
const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`

const cache = new InMemoryCache()
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
            authorization: localStorage.getItem('github_token')
                ? `Bearer ${localStorage.getItem('github_token')}`
                : null,
        },
    }),
    typeDefs,
})

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('github_token'),
    },
})

function IsLoggedIn() {
    const { data } = useQuery(IS_LOGGED_IN)
    return data.isLoggedIn ? <App /> : <Login />
}

ReactDom.render(
    <ApolloProvider client={client}>
        <IsLoggedIn />
    </ApolloProvider>,
    document.getElementById('root') as HTMLElement
)
