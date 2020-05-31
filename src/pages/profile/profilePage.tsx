import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import RepoList from './components/repoList'
import './profilePage.scss'
import ExternalLink from '../../components/externalLink/externalLink'
import Loading from '../../components/loading/loading'
import { NetworkStatus } from 'apollo-client'
import ErrorMessage from '../../components/errorMessage/errorMessage'
import Info from '../../components/info/info'

const ProfilePage: React.FunctionComponent = () => {
    const params = useParams()
    const value = params.value
    const sessionStorageKey = `${value}-repo-cache`
    const profileCache = sessionStorage.getItem(sessionStorageKey)

    const profileCacheParsed = profileCache
        ? JSON.parse(profileCache)
        : {
              ascOrder: true,
          }
    const [ascOrder, setAscOrder] = React.useState<boolean>(profileCacheParsed.ascOrder)

    const [getProfile, { data, loading, error, networkStatus, fetchMore, refetch }] = useLazyQuery(
        GET_PROFILE,
        {
            notifyOnNetworkStatusChange: true,
            partialRefetch: true,
        }
    )
    React.useEffect(() => {
        getProfile({
            variables: {
                user: value,
                orderBy: ascOrder ? 'ASC' : 'DESC',
                after: null,
            },
        })
    }, [value])

    if (!data) return <Loading />
    if (
        loading &&
        networkStatus !== NetworkStatus.fetchMore &&
        networkStatus !== NetworkStatus.refetch &&
        networkStatus !== NetworkStatus.setVariables
    ) {
        return <Loading loadingMessage={NetworkStatus[networkStatus]} />
    }
    if (error) return <ErrorMessage message={error.message} />

    const { avatarUrl, email, login, url } = data.user
    const { totalCount, nodes } = data.user.repositories
    const { hasNextPage, endCursor } = data.user.repositories.pageInfo
    const repos = nodes

    const loadMore = () => {
        fetchMore({
            variables: {
                after: endCursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                sessionStorage.setItem(
                    sessionStorageKey,
                    JSON.stringify({
                        ascOrder: ascOrder,
                    })
                )
                return {
                    ...fetchMoreResult,
                    user: {
                        ...fetchMoreResult.user,
                        repositories: {
                            ...fetchMoreResult.user.repositories,
                            nodes: [
                                ...prev.user.repositories.nodes,
                                ...fetchMoreResult.user.repositories.nodes,
                            ],
                        },
                    },
                }
            },
        })
    }

    const onSortClick = () => {
        event.preventDefault()
        refetch({
            orderBy: ascOrder ? 'DESC' : 'ASC',
        })
        sessionStorage.setItem(
            sessionStorageKey,
            JSON.stringify({
                ascOrder: !ascOrder,
            })
        )
        setAscOrder(!ascOrder)
    }

    const onScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        event.preventDefault()
        const target = event.currentTarget
        if (Math.ceil(target.scrollTop + target.clientHeight + 500) >= target.scrollHeight) {
            loadMore()
        }
    }

    const shouldFetchMore = hasNextPage && networkStatus !== NetworkStatus.fetchMore

    return (
        <>
            <Info message={`${login} has ${totalCount} repositories in total`} />
            <div className="profile__container" onScroll={shouldFetchMore ? onScroll : undefined}>
                <section className="profile__card">
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="profile__card__image-link"
                    >
                        <img src={avatarUrl} width={256} />
                    </a>
                    <div className="profile__info">
                        <a
                            href={url}
                            className="profile__info__login"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <h2>{login}</h2>
                        </a>
                        <div className="profile__info__email">{email}</div>
                        <ExternalLink url={url} />
                    </div>
                </section>
                <RepoList repos={repos} onSortClick={onSortClick} ascOrder={ascOrder} />
            </div>
        </>
    )
}
export default ProfilePage

const GET_PROFILE = gql`
    query user($user: String!, $orderBy: String!, $after: String) {
        user(login: $user) {
            avatarUrl
            email
            login
            url
            repositories(first: 100, orderBy: { field: NAME, direction: $orderBy }, after: $after) {
                totalCount
                nodes {
                    name
                    description
                    url
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`
