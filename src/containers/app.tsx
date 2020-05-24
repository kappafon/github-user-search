import React from 'react'
import Greeting from '../components/greeting/greeting'
import Search from './search/search'

const App: React.FunctionComponent = () => {
    return (
        <>
            <Greeting />
            <Search />
        </>
    )
}
export default App
