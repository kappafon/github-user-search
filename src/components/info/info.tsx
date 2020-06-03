import React from 'react'
import './info.scss'

//#region Interfaces
export interface InfoProps {
    message?: string
}

//#endregion Interfaces

const Info: React.FunctionComponent<InfoProps> = (props) => {
    const { message } = props

    return (
        <div className="info-message__container">
            <div className="info-message__message">{message}</div>
        </div>
    )
}
export default Info
