import React from 'react'

export interface RepoListProps {
    repos?: Array<any>
}

const RepoList: React.FunctionComponent<RepoListProps> = (props) => {
    return (
        <div>
            {/* <button>sort</button> */}
            {props.repos.map((repo, index) => {
                const { name, description, url } = repo.node
                return (
                    <span key={index}>
                        <h2>{name}</h2>
                        <div>{description}</div>
                        <a href={url} target="_blank" rel="noreferrer">
                            {url}
                        </a>
                    </span>
                )
            })}
        </div>
    )
}
export default RepoList
