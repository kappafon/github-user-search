import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import UsersList from './components/usersList'
import './usersPage.scss'
import Loading from '../../components/loading/loading'
import ErrorMessage from '../../components/error/error'
import { NetworkStatus } from 'apollo-client'

const UsersPage: React.FunctionComponent = () => {
    const params = useParams()
    const userQuery = params.value
    const [getUsers, { data, error, loading, networkStatus, fetchMore }] = useLazyQuery(GET_USERS, {
        notifyOnNetworkStatusChange: true,
    })

    React.useEffect(() => {
        getUsers({ variables: { user: userQuery, after: null } })
    }, [userQuery])

    if (!data) return <Loading />
    if (loading && networkStatus !== NetworkStatus.fetchMore) {
        return <Loading loadingMessage={NetworkStatus[networkStatus]} />
    }
    if (error) return <ErrorMessage message={error.message} />

    const users = data.search.nodes
    if (!users.length) {
        return (
            <ErrorMessage
                message={
                    <p>
                        User not found. <br /> Try a different username.
                    </p>
                }
            />
        )
    }

    const loadMoreUsers = () => {
        fetchMore({
            variables: {
                after: data.search.pageInfo.endCursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                return {
                    ...fetchMoreResult,
                    search: {
                        ...fetchMoreResult.search,
                        nodes: [...prev.search.nodes, ...fetchMoreResult.search.nodes],
                    },
                }
            },
        })
    }

    return (
        <div className="users__container">
            {data.search.pageInfo.hasNextPage && (
                <button
                    disabled={networkStatus === NetworkStatus.fetchMore}
                    onClick={loadMoreUsers}
                >
                    Load More
                </button>
            )}
            <p>{data.search.userCount} user(s) found</p>
            <UsersList users={users} />
        </div>
    )
}
export default UsersPage

const GET_USERS = gql`
    query user($user: String!, $after: String) {
        search(query: $user, type: USER, first: 3, after: $after) {
            userCount
            nodes {
                ... on User {
                    login
                    avatarUrl
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`
