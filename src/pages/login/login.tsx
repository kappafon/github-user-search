import React from 'react'
import ApolloClient from 'apollo-client'
import { useApolloClient } from '@apollo/react-hooks'
import { FaGithubAlt } from 'react-icons/fa'
import './login.scss'
import Loading from '../../components/loading/loading'

const Login: React.FunctionComponent = () => {
    const client: ApolloClient<any> = useApolloClient()
    const [loading, setLoading] = React.useState<boolean>(!!localStorage.getItem('github_token'))

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
                        <h2 className="login__box__title">GitHub User Finder</h2>
                        <div>To start looking up users, please login.</div>
                        <a className="login__button" href={LOGIN_URI}>
                            Login
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}
export default Login

const CLIENT_ID = '8dde7ff4708b3b012c93'
const REDIRECT_URI = 'http://localhost:3000/'
const LOGIN_URI = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20public_repo%20gist&redirect_uri=${REDIRECT_URI}`
const AUTH_API_URI = 'https://kappafon-user-search.herokuapp.com/authenticate/'
