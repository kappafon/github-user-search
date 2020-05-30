import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import RepoList from './components/repoList'
import './profilePage.scss'
import ExternalLink from '../../components/externalLink/externalLink'
import Loading from '../../components/loading/loading'
import { NetworkStatus } from 'apollo-client'
import ErrorMessage from '../../components/error/error'

const threshold = 50
const ProfilePage: React.FunctionComponent = () => {
    const params = useParams()
    const value = params.value
    const sessionStorageKey = `${value}-repo-cache`
    const profileCache = sessionStorage.getItem(sessionStorageKey)

    const profileCacheParsed = profileCache
        ? JSON.parse(profileCache)
        : {
              visibleRepoCount: threshold,
              orderBy: true,
          }
    const [ascOrder, setAscOrder] = React.useState<boolean>(profileCacheParsed.orderBy)

    // const repoCount = sessionStorage.getItem(sessionStorageKey)
    // const thresholdCount = repoCount ? JSON.parse(repoCount) : threshold

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
                threshold: profileCacheParsed.visibleRepoCount,
                orderBy: ascOrder ? 'ASC' : 'DESC',
                after: null,
            },
        })
    }, [value])
    console.log('ProfilePage:React.FunctionComponent -> data', data)

    // if (networkStatus === 4) return <Loading loadingMessage="Refetching" />
    // if (!data) return <Loading />
    if (
        loading &&
        networkStatus !== NetworkStatus.fetchMore &&
        networkStatus !== NetworkStatus.refetch &&
        networkStatus !== NetworkStatus.setVariables
    ) {
        return <Loading loadingMessage={NetworkStatus[networkStatus]} />
    }
    if (error) return <ErrorMessage message={error.message} />

    const profile = data && data.user ? data.user : null
    const repos = profile ? profile.repositories.edges : []
    const pageInfo = profile ? profile.repositories.pageInfo : null

    const loadMore = () => {
        fetchMore({
            variables: {
                user: value,
                orderBy: ascOrder ? 'ASC' : 'DESC',
                after: data.user.repositories.pageInfo.endCursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                const result = {
                    ...fetchMoreResult,
                    user: {
                        ...fetchMoreResult.user,
                        repositories: {
                            ...fetchMoreResult.user.repositories,
                            edges: [
                                ...prev.user.repositories.edges,
                                ...fetchMoreResult.user.repositories.edges,
                            ],
                        },
                    },
                }
                sessionStorage.setItem(
                    sessionStorageKey,
                    JSON.stringify({
                        visibleRepoCount: result.user.repositories.edges.length,
                        orderBy: ascOrder ? 'ASC' : 'DESC',
                    })
                )
                return result
            },
        })
    }

    const onSortClick = () => {
        event.preventDefault()
        refetch({
            // user: value,
            threshold:
                profileCacheParsed.visibleRepoCount > 100
                    ? 100
                    : profileCacheParsed.visibleRepoCount,
            orderBy: ascOrder ? 'DESC' : 'ASC',
        })
        setAscOrder(!ascOrder)
    }
    return (
        <div className="profile__container">
            {!profile ? (
                <div>profile page</div>
            ) : (
                <section className="profile__card">
                    <a href={profile.url} target="_blank" rel="noreferrer">
                        <img src={profile.avatarUrl} width={256} />
                    </a>
                    <div className="profile__info">
                        <a
                            href={profile.url}
                            className="profile__info__login"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <h2>{profile.login}</h2>
                        </a>
                        <div className="profile__info__email">{profile.email}</div>
                        <ExternalLink url={profile.url} />
                    </div>
                </section>
            )}
            <RepoList
                repos={repos}
                onSortClick={onSortClick}
                loadMore={loadMore}
                ascOrder={ascOrder}
                pageInfo={pageInfo}
            />
        </div>
    )
}
export default ProfilePage

const GET_PROFILE = gql`
    query user($user: String!, $threshold: Int!, $orderBy: String!, $after: String) {
        user(login: $user) {
            avatarUrl
            email
            login
            url
            repositories(
                first: $threshold
                orderBy: { field: NAME, direction: $orderBy }
                after: $after
            ) {
                totalCount
                edges {
                    node {
                        name
                        description
                        url
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`
