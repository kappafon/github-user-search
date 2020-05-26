import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Greeting from '../components/greeting/greeting'
import Search from '../components/search/search'
import UsersPage from './users/usersPage'
import ProfilePage from './profile/profilePage'

const App: React.FunctionComponent = () => {
    return (
        <>
            <Search />
            <Link to="/">Home</Link>
            <Switch>
                <Route exact path="/">
                    <Greeting />
                </Route>
                <Route path="/users/:value">
                    <UsersPage />
                </Route>
                <Route path="/profile/:value">
                    <ProfilePage />
                </Route>
            </Switch>
        </>
    )

    // bring login on route here and  either pass greeting or login, create provider here?
}
export default App
