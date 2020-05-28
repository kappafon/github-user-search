import React from 'react'
import './loading.scss'

export interface LoadingProps {
    loadingMessage?: string
}

const Loading: React.FunctionComponent<LoadingProps> = (props) => {
    const { loadingMessage = 'Loading' } = props
    return (
        <div className="loading-component" data-testid="loading-animation">
            <div className="ellipsis">
                <div />
                <div />
                <div />
                <div />
            </div>
            <span>{loadingMessage}</span>
        </div>
    )
}
export default Loading
