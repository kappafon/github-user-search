import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import Users from './components/users'
import './usersPage.scss'
import Loading from '../../components/loading/loading'

const UsersPage: React.FunctionComponent = () => {
    const [getUsers, { loading, data, error }] = useLazyQuery(GET_USERS)
    const params = useParams()
    const value = params.value

    React.useEffect(() => {
        getUsers({ variables: { user: value } })
    }, [value])

    if (loading) return <Loading />
    if (error) return <p>Error</p>

    const users = data && data.search && data.search.edges ? data.search.edges : []
    return (
        <div className="users__container">
            {users.length === 0 ? <div>no result</div> : <Users users={users} />}
        </div>
    )
}
export default UsersPage

const GET_USERS = gql`
    query user($user: String!) {
        search(query: $user, type: USER, first: 100) {
            userCount
            edges {
                node {
                    ... on User {
                        login
                        id
                        avatarUrl
                    }
                }
            }
        }
    }
`
