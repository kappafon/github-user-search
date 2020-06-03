import 'core-js/stable'
import App from './pages/app'
import ErrorMessage from './components/errorMessage/errorMessage'
import gql from 'graphql-tag'
import Loading from './components/loading/loading'
import Login from './pages/login/login'
import noFlash from './noflash.js'
import React from 'react'
import ReactDom from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import { BrowserRouter } from 'react-router-dom'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import './index.scss'

noFlash()
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

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('github_token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const cache = new InMemoryCache()
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
    typeDefs,
})

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('github_token'),
    },
})

function IsLoggedIn() {
    const { data, error, loading } = useQuery(IS_LOGGED_IN)
    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error.message} />

    return data.isLoggedIn ? <App /> : <Login />
}

ReactDom.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <IsLoggedIn />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root') as HTMLElement
)
