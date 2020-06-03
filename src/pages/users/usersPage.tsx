import ErrorMessage from '../../components/errorMessage/errorMessage'
import gql from 'graphql-tag'
import Info from '../../components/info/info'
import Loading from '../../components/loading/loading'
import React from 'react'
import UsersList from './components/usersList'
import { deDuplicateArray } from '../../utils/utils'
import { USERS_PAGE } from '../../assets/strings/strings'
import { NetworkStatus } from 'apollo-client'
import { useLazyQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import './usersPage.scss'

//#region Interfaces
interface SearchUsersVars {
    user?: string
    after?: string
}

interface PageInfo {
    hasNextPage: boolean
    endCursor: string
}

export interface UsersInfo {
    login: string
    avatarUrl: string
}

interface Users {
    userCount: number
    nodes: Array<UsersInfo>
    pageInfo: PageInfo
}

interface SearchUsersData {
    search: Users
}

//#endregion Interfaces

const UsersPage: React.FunctionComponent = () => {
    const params = useParams()
    const userQuery = params.value
    const [getUsers, { data, error, loading, networkStatus, fetchMore }] = useLazyQuery<
        SearchUsersData,
        SearchUsersVars
    >(GET_USERS, {
        notifyOnNetworkStatusChange: true,
    })
    const { userNotFound } = USERS_PAGE

    React.useEffect(() => {
        getUsers({ variables: { user: userQuery, after: null } })
    }, [userQuery])

    if (!data) return <Loading />
    if (loading && networkStatus !== NetworkStatus.fetchMore)
        return <Loading loadingMessage={NetworkStatus[networkStatus]} />
    if (error) return <ErrorMessage message={error.message} />

    const { nodes, userCount } = data.search
    if (!userCount) return <ErrorMessage message={userNotFound} />

    const { hasNextPage, endCursor } = data.search.pageInfo
    const users = nodes

    const loadMoreUsers = () => {
        fetchMore({
            variables: {
                after: endCursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                const unifiedArray = deDuplicateArray('login', [
                    ...prev.search.nodes,
                    ...fetchMoreResult.search.nodes,
                ])
                return {
                    ...fetchMoreResult,
                    search: {
                        ...fetchMoreResult.search,
                        nodes: unifiedArray,
                    },
                }
            },
        })
    }

    const onScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        event.preventDefault()
        const target = event.currentTarget
        if (Math.ceil(target.scrollTop + target.clientHeight + 500) >= target.scrollHeight) {
            loadMoreUsers()
        }
    }

    const shouldFetchMore = hasNextPage && networkStatus !== NetworkStatus.fetchMore

    return (
        <>
            <Info message={`${userCount} user(s) found`} />
            <div className="users__container" onScroll={shouldFetchMore ? onScroll : undefined}>
                <div className="users__container__user-list">
                    <UsersList users={users} />
                </div>
            </div>
        </>
    )
}
export default UsersPage

const GET_USERS = gql`
    query getUserProfile($user: String!, $after: String) {
        search(query: $user, type: USER, first: 100, after: $after) {
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
