import React from 'react'
import useDarkMode from 'use-dark-mode'
import './darkModeToggle.scss'

const DarkModeToggle: React.FunctionComponent = () => {
    const darkMode = useDarkMode()
    return (
        <button type="button" onClick={darkMode.toggle} className="dark-mode-toggle">
            {darkMode.value ? '☾' : '☀'}
        </button>
    )
}
export default DarkModeToggle
