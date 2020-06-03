import ApolloClient from 'apollo-client'
import Loading from '../../components/loading/loading'
import React from 'react'
import { LOGIN } from '../../assets/strings/strings'
import { FaGithubAlt } from 'react-icons/fa'
import { useApolloClient } from '@apollo/react-hooks'
import './login.scss'

const isProduction = process.env.NODE_ENV === 'production'

const Login: React.FunctionComponent = () => {
    const client: ApolloClient<any> = useApolloClient()
    const [loading, setLoading] = React.useState<boolean>(!!localStorage.getItem('github_token'))
    const { login, description, appName } = LOGIN

    React.useEffect(() => {
        if (localStorage.getItem('github_token')) {
            return
        }
        const code =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1]
        if (code) {
            setLoading(true)
            fetch(`${AUTH_API_URI}${code}`)
                .then((response) => response.json())
                .then(({ token }) => {
                    if (token) {
                        localStorage.setItem('github_token', token)
                        client.writeData({ data: { isLoggedIn: true } })
                    }
                })
        }
    }, [])

    return (
        <>
            {loading && <Loading />}
            {!loading && (
                <div className="login__container">
                    <div className="login__box">
                        <FaGithubAlt size="4em" className="login__logo-image" />
                        <h2 className="login__box__title">{appName}</h2>
                        <div>{description}</div>
                        <a className="login__button" href={LOGIN_URI}>
                            {login}
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}
export default Login

const CLIENT_ID_DEV = '8dde7ff4708b3b012c93'
const REDIRECT_URI_DEV = 'http://localhost:3000/'
const AUTH_API_URI_DEV = 'https://kappafon-user-search.herokuapp.com/authenticate/'

const CLIENT_ID_PRODUCTION = 'cea04797ba11f6a7469e'
const REDIRECT_URI_PRODUCTION = 'https://kappafon.github.io/github-user-search/'
const AUTH_API_URI_PRODUCTION = 'https://kappafon-user-search-deployed.herokuapp.com/authenticate/'

const AUTH_API_URI = isProduction ? AUTH_API_URI_PRODUCTION : AUTH_API_URI_DEV
const LOGIN_URI = `https://github.com/login/oauth/authorize?client_id=${
    isProduction ? CLIENT_ID_PRODUCTION : CLIENT_ID_DEV
}&scope=user%20public_repo%20gist&redirect_uri=${
    isProduction ? REDIRECT_URI_PRODUCTION : REDIRECT_URI_DEV
}`
