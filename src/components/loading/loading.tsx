import React from 'react'
import './loading.scss'

export interface LoadingProps {
    loadingMessage?: string
}

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
