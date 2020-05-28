import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import './greeting.scss'
import Loading from '../loading/loading'

const Greeting: React.FunctionComponent = () => {
    const { loading, error, data } = useQuery(VIEWER)

    if (loading) return <Loading />
    if (error) return <p>Error</p>

    return (
        <div className="greeting-message">
            Hello {data.viewer.login}! To get started type a username in the search box.
        </div>
    )
}
export default Greeting

const VIEWER = gql`
    {
        viewer {
            login
        }
    }
`
