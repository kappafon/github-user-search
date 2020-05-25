import React from 'react'

export interface LoadingProps {
    loadingMessage?: string
}

const Loading: React.FunctionComponent<LoadingProps> = (props) => {
    return <div>...{props.loadingMessage && <span>{props.loadingMessage}</span>}</div>
}
export default Loading
