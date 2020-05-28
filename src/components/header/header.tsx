import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../search/search'
import './header.scss'
import { FaGithub } from 'react-icons/fa'

const header: React.FunctionComponent = () => {
    return (
        <div className="header__body">
            <div className="header__wrapper">
                <h1 className="header__title">
                    <Link to="/" className="header__home-link">
                        <FaGithub size={32} className="header__logo-image" />
                        GitHub User Finder
                    </Link>
                </h1>
                <Search />
            </div>
        </div>
    )
}
export default header
