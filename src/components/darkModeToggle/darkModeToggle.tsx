import React from 'react'
import useDarkMode from 'use-dark-mode'
import { FaSun, FaMoon } from 'react-icons/fa'
import './darkModeToggle.scss'

const DarkModeToggle: React.FunctionComponent = () => {
    const darkMode = useDarkMode()
    return (
        <div onClick={darkMode.toggle} className="dark-mode-toggle">
            {darkMode.value ? (
                <FaMoon size="16px" className="moon__icon" />
            ) : (
                <FaSun size="16px" className="sun__icon" />
            )}
        </div>
    )
}
export default DarkModeToggle
