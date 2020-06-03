import React from 'react'
import './loading.scss'

//#region Interfaces
export interface LoadingProps {
    loadingMessage?: string
}

//#endregion Interfaces

const Loading: React.FunctionComponent<LoadingProps> = (props) => {
    const { loadingMessage } = props
    return (
        <div className="loading-component">
            <div className="ellipsis">
                <div />
                <div />
                <div />
                <div />
            </div>
            {loadingMessage && <span>{loadingMessage}</span>}
        </div>
    )
}
export default Loading
