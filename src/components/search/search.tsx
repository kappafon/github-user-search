import React from 'react'
import { useHistory } from 'react-router-dom'

const Search: React.FunctionComponent = () => {
    const history = useHistory()
    const [value, setValue] = React.useState<string>('')

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const onSubmitClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        history.push(`/users/${value}`)
        setValue('')
    }

    return (
        <>
            <form id="form" className="form">
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    value={value}
                    onChange={onInputChange}
                />
                <button type="submit" onClick={onSubmitClick}>
                    Submit
                </button>
            </form>
        </>
    )
}
export default Search
