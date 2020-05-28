import React from 'react'
import './errorMessage.scss'

export interface ErrorMessageProps {
    message?: React.ReactNode
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
    const { message = 'Try refreshing your page!' } = props
    return <div className="error-message">{message}</div>
}

export default ErrorMessage
