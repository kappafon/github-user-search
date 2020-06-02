import React from 'react'
import classNames from 'classnames'
import './repoList.scss'
import ExternalLink from '../../../components/externalLink/externalLink'
import { FaLongArrowAltUp } from 'react-icons/fa'
import { OrderBy } from '../profilePage'

export interface RepoListProps {
    repos?: Array<any>
    sortOrder?: OrderBy
    onSortClick?(): void
}

const RepoList: React.FunctionComponent<RepoListProps> = (props) => {
    const { sortOrder } = props
    const onSortClick = (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
        event.preventDefault()
        props.onSortClick()
    }
    const arrowIconClassName = classNames('repo-list__title__icon', {
        'straight-icon': sortOrder === OrderBy.Ascending,
        'reverse-icon': sortOrder === OrderBy.Descending,
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
                        <div className="repo__card-wrapper" key={index}>
                            <section className="repo__card">
                                <a
                                    href={url}
                                    className="profile__info__login"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <h3 className="repo__card__title">{name}</h3>
                                </a>
                                {description && (
                                    <div className="repo__card__description">{description}</div>
                                )}
                                <ExternalLink url={url} className="repo__card__link" />
                            </section>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default RepoList
