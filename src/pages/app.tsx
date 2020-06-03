import Greeting from '../components/greeting/greeting'
import Header from '../components/header/header'
import ProfilePage from './profile/profilePage'
import React from 'react'
import UsersPage from './users/usersPage'
import { RoutePatterns } from '../constants/routes'
import { Route, Switch } from 'react-router-dom'
import './app.scss'

const App: React.FunctionComponent = () => {
    const { HOME, USERS_PAGE, PROFILE_PAGE } = RoutePatterns
    return (
        <div className="app__container">
            <Header />
            <Switch>
                <Route exact path={HOME}>
                    <Greeting />
                </Route>
                <Route path={USERS_PAGE}>
                    <UsersPage />
                </Route>
                <Route path={PROFILE_PAGE}>
                    <ProfilePage />
                </Route>
            </Switch>
        </div>
    )
}
export default App
