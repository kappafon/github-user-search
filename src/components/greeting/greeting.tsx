import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Loading from '../loading/loading'
import ErrorMessage from '../errorMessage/errorMessage'
import { GREETING } from '../../assets/strings/strings'
import './greeting.scss'

const Greeting: React.FunctionComponent = () => {
    const { loading, error, data } = useQuery(VIEWER)

    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error.message} />
    const { hello, getStarted } = GREETING

    return <div className="greeting-message">{`${hello} ${data.viewer.login}! ${getStarted}`}</div>
}
export default Greeting

const VIEWER = gql`
    {
        viewer {
            login
        }
    }
`
