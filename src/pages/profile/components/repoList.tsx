import React from 'react'
import classNames from 'classnames'
import './repoList.scss'
import ExternalLink from '../../../components/externalLink/externalLink'
import { FaLongArrowAltUp } from 'react-icons/fa'

export interface RepoListProps {
    repos?: Array<any>
    pageInfo?: any
    ascOrder?: boolean
    onSortClick?(): void
    loadMore?(): void
}

const RepoList: React.FunctionComponent<RepoListProps> = (props) => {
    const { ascOrder } = props
    const onSortClick = (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
        event.preventDefault()
        props.onSortClick()
    }
    const arrowIconClassName = classNames('repo-list__title__icon', {
        'straight-icon': ascOrder,
        'reverse-icon': !ascOrder,
    })

    return (
        <>
            <h2 className="repo-list__title" onClick={onSortClick}>
                Repositories <FaLongArrowAltUp size="14px" className={arrowIconClassName} />
            </h2>
            <div className="repo-list__container">
                {props.repos.map((repo, index) => {
                    const { name, description, url } = repo
                    return (
                        <section className="repo__card" key={index}>
                            <h3 className="repo__card__title">{name}</h3>
                            <div className="repo__card__description">{description}</div>
                            <ExternalLink url={url} className="repo__card__link" />
                        </section>
                    )
                })}
            </div>
        </>
    )
}
export default RepoList
