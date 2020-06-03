import React from 'react'
import Search from '../search/search'
import { APP_TITLE } from '../../assets/strings/strings'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './header.scss'
import { RoutePatterns } from '../../constants/routes'

const header: React.FunctionComponent = () => {
    return (
        <div className="header__body">
            <div className="header__wrapper">
                <h1 className="header__title">
                    <Link to={RoutePatterns.HOME} className="header__home-link">
                        <FaGithub size={32} className="header__logo-image" />
                        {APP_TITLE}
                    </Link>
                </h1>
                <Search />
            </div>
        </div>
    )
}
export default header
