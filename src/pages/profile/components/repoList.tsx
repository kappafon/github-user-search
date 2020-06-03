import classNames from 'classnames'
import ExternalLink from '../../../components/externalLink/externalLink'
import React from 'react'
import { OrderBy, RepositoryInfo } from '../profilePage'
import { FaLongArrowAltUp } from 'react-icons/fa'
import { PROFILE_PAGE } from '../../../assets/strings/strings'
import './repoList.scss'

//#region Interfaces
export interface RepoListProps {
    repos: Array<RepositoryInfo>
    sortOrder: OrderBy
    onSortClick(): void
}

//#endregion Interfaces

const RepoList: React.FunctionComponent<RepoListProps> = (props) => {
    const { repositories } = PROFILE_PAGE
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
                {repositories} <FaLongArrowAltUp size="14px" className={arrowIconClassName} />
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
