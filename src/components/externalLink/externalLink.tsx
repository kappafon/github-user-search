import classNames from 'classnames'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import './externalLink.scss'

//#region Interfaces
export interface ExternalLinkProps {
    url: string
    text?: string
    className?: string
}

//#endregion Interfaces

const ExternalLink: React.FunctionComponent<ExternalLinkProps> = (props) => {
    const { url, text = props.url, className } = props

    const externalLinkClassName = classNames('external-link', { className })
    return (
        <a href={url} className={externalLinkClassName} target="_blank" rel="noreferrer">
            {text}
            <FaExternalLinkAlt size="12px" className="external-link__icon" />
        </a>
    )
}
export default ExternalLink
