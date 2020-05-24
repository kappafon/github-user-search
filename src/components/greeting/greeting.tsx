import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const Greeting: React.FunctionComponent = () => {
    const { loading, error, data } = useQuery(VIEWER)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return <div>Hello {data.viewer.login}!</div>
}
export default Greeting

const VIEWER = gql`
    {
        viewer {
            login
        }
    }
`
