import classNames from 'classnames'
import DarkModeToggle from '../darkModeToggle/darkModeToggle'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useHistory, useLocation } from 'react-router-dom'
import './search.scss'

const Search: React.FunctionComponent = () => {
    const history = useHistory()
    const location = useLocation()
    const [value, setValue] = React.useState<string>('')

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value.trim())
    }

    const onSubmitClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        const currentPath = location.pathname
        const newPath = `/users/${value}`
        if (currentPath === newPath) return
        history.push(`/users/${value}`)
    }
    const searchButtonClassName = classNames('search__button', { disabled: value.length === 0 })
    return (
        <form id="form" className="search__container">
            <input
                type="text"
                placeholder="Enter username"
                className="search__box"
                value={value}
                onChange={onInputChange}
            />
            <button
                className={searchButtonClassName}
                type="submit"
                onClick={onSubmitClick}
                disabled={value.length === 0}
            >
                <FaSearch fontSize="16px" />
            </button>
            <DarkModeToggle />
        </form>
    )
}
export default Search
