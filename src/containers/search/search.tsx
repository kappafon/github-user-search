import React from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/react-hooks'
import Users from './components/users'

const Search: React.FunctionComponent = () => {
    const [value, setValue] = React.useState<string>('')
    const [getUsers, { loading, data, error }] = useLazyQuery(GET_USERS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const onSubmitClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        getUsers({ variables: { user: value } })
    }

    const users = data ? data.search.edges : []

    return (
        <>
            <form id="form" className="form">
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    value={value}
                    onChange={onInputChange}
                />
                <button type="submit" onClick={onSubmitClick}>
                    Submit
                </button>
            </form>
            <Users users={users} />
        </>
    )
}
export default Search

const GET_USERS = gql`
    query user($user: String!) {
        search(query: $user, type: USER, first: 100) {
            userCount
            edges {
                node {
                    ... on User {
                        login
                    }
                }
            }
        }
    }
`
