import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import RepoList from './components/repoList'

const ProfilePage: React.FunctionComponent = () => {
    const [ascOrder, setAscOrder] = React.useState<boolean>(true)
    const params = useParams()
    const value = params.value

    const [getUsers, { loading, data, error, refetch, networkStatus }] = useLazyQuery(GET_PROFILE, {
        notifyOnNetworkStatusChange: true,
        partialRefetch: true,
    })
    React.useEffect(() => {
        getUsers({ variables: { user: value, direction: ascOrder ? 'ASC' : 'DESC' } })
    }, [value])

    if (networkStatus === 4) return <p>Refetching...</p>
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    const profile = data && data.user ? data.user : null
    const repos = profile ? profile.repositories.edges : []

    const onSortClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        refetch({ direction: ascOrder ? 'DESC' : 'ASC' })
        setAscOrder(!ascOrder)
    }
    return (
        <div>
            {!profile ? (
                <div>profile page</div>
            ) : (
                <span>
                    <img src={profile.avatarUrl} width={256} />
                    <div>{profile.login}</div>
                    <div>{profile.email}</div>
                    <a href={profile.url} target="_blank" rel="noreferrer">
                        {profile.url}
                    </a>
                </span>
            )}
            <button onClick={onSortClick}>Sort By Name</button>
            <div>{repos.length === 0 ? <div>no repos</div> : <RepoList repos={repos} />}</div>
        </div>
    )
}
export default ProfilePage

const GET_PROFILE = gql`
    query user($user: String!, $direction: String!) {
        user(login: $user) {
            avatarUrl
            email
            login
            url
            repositories(first: 100, orderBy: { field: NAME, direction: $direction }) {
                edges {
                    node {
                        name
                        description
                        url
                    }
                }
            }
        }
    }
`
