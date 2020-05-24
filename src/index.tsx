import 'core-js/stable'
import React from 'react'
import ReactDom from 'react-dom'
import App from './containers/app'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { HashRouter } from 'react-router-dom'
import Loading from './components/loading'

const STATUS = {
    INITIAL: 'initial',
    LOADING: 'loading',
    FINISHED_LOADING: 'finished_loading',
    AUTHENTICATED: 'authenticated',
}

const CLIENT_ID = '8dde7ff4708b3b012c93'
const REDIRECT_URI = 'http://localhost:3000/'
const AUTH_API_URI = 'https://kappafon-user-search.herokuapp.com/authenticate/'

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: (operation) => {
        const token = localStorage.getItem('github_token')
        if (token) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
        }
    },
})

const Root = () => {
    const [status, setStatus] = React.useState<string>(STATUS.INITIAL)

    React.useEffect(() => {
        const storedToken = localStorage.getItem('github_token')
        if (storedToken) {
            setStatus(STATUS.AUTHENTICATED)
            return
        }
        const code =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1]
        if (code) {
            setStatus(STATUS.LOADING)
            fetch(`${AUTH_API_URI}${code}`)
                .then((response) => response.json())
                .then(({ token }) => {
                    if (token) {
                        localStorage.setItem('github_token', token)
                    }
                    setStatus(STATUS.FINISHED_LOADING)
                })
        }
    }, [])

    const loginUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20public_repo%20gist&redirect_uri=${REDIRECT_URI}`
    const loginStyle = { display: status === STATUS.INITIAL ? 'inline' : 'none' }

    return (
        <HashRouter>
            <ApolloProvider client={client}>
                <a style={loginStyle} href={loginUrl}>
                    Login
                </a>
                <Loading loadingMessage={status} />
                <App />
            </ApolloProvider>
        </HashRouter>
    )
}

ReactDom.render(<Root />, document.getElementById('root') as HTMLElement)
