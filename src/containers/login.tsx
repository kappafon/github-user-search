import React from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import ApolloClient from 'apollo-client'

const Login: React.FunctionComponent = () => {
    const client: ApolloClient<any> = useApolloClient()
    const [status, setStatus] = React.useState<string>(STATUS.INITIAL)

    React.useEffect(() => {
        if (localStorage.getItem('github_token')) {
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
                        client.writeData({ data: { isLoggedIn: true } })
                        setStatus(STATUS.FINISHED_LOADING)
                    }
                })
        }
    }, [])

    return (
        <>
            <div>{status}</div>
            <a href={LOGIN_URI}>Login</a>
        </>
    )
}
export default Login

const STATUS = {
    INITIAL: 'initial',
    LOADING: 'loading',
    FINISHED_LOADING: 'finished_loading',
    AUTHENTICATED: 'authenticated',
}

const CLIENT_ID = '8dde7ff4708b3b012c93'
const REDIRECT_URI = 'http://localhost:3000/'
const LOGIN_URI = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20public_repo%20gist&redirect_uri=${REDIRECT_URI}`
const AUTH_API_URI = 'https://kappafon-user-search.herokuapp.com/authenticate/'
