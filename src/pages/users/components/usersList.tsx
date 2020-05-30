import React from 'react'
import { Link } from 'react-router-dom'
import './usersList.scss'

export interface UsersListProps {
    users?: Array<any>
}

const UsersList: React.FunctionComponent<UsersListProps> = (props) => {
    return (
        <>
            {props.users.map((user) => {
                const { login, avatarUrl } = user
                const alt = `${login}'s profile picture.`
                return (
                    <Link key={login} to={'/profile/' + login} className="user__box">
                        <img className="user__image" src={avatarUrl} alt={alt} width={128} />
                        <div className="user__username">{login}</div>
                    </Link>
                )
            })}
        </>
    )
}
export default UsersList
