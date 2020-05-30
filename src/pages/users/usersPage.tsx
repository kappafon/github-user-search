import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import Users from './components/users'
import './usersPage.scss'
import Loading from '../../components/loading/loading'

const UsersPage: React.FunctionComponent = () => {
    const [getUsers, { loading, data, error, fetchMore }] = useLazyQuery(GET_USERS)
    const params = useParams()
    const value = params.value

    React.useEffect(() => {
        getUsers({ variables: { user: value } })
    }, [value])

    if (loading) return <Loading />
    if (error) return <p>{error.message}</p>

    const users = data && data.search && data.search.edges ? data.search.edges : []

    const loadMore = () => {
        console.log('loadingMore')
        fetchMore({
            variables: {
                after: data.search.pageInfo.endCursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                console.log('loadMore -> prev', prev)
                if (!fetchMoreResult) return prev
                console.log('loadMore -> fetchMoreResult', fetchMoreResult)
                return {
                    ...fetchMoreResult,
                    search: {
                        ...fetchMoreResult.search,
                        edges: [...prev.search.edges, ...fetchMoreResult.search.edges],
                    },
                }
            },
        })
    }

    return (
        <div className="users__container">
            {users.length === 0 ? (
                <div>no result</div>
            ) : (
                <>
                    {data.search.pageInfo.hasNextPage && <div onClick={loadMore}>load more</div>}
                    <Users users={users} />
                </>
            )}
        </div>
    )
}
export default UsersPage

const GET_USERS = gql`
    query user($user: String!, $after: String) {
        search(query: $user, type: USER, first: 3, after: $after) {
            userCount
            edges {
                node {
                    ... on User {
                        login
                        id
                        avatarUrl
                    }
                }
                cursor
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`
