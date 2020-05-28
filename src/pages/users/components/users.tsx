import React from 'react'
import { Link } from 'react-router-dom'
import './users.scss'

export interface UsersProps {
    users?: Array<any>
}

const Users: React.FunctionComponent<UsersProps> = (props) => {
    return (
        <>
            {props.users.map((user) => {
                const { login, id, avatarUrl } = user.node
                const alt = `${login}'s profile picture.`
                return (
                    <Link key={id} to={'/profile/' + login} className="user__box">
                        <img className="user__image" src={avatarUrl} alt={alt} width={128} />
                        <div className="user__username">{login}</div>
                    </Link>
                )
            })}
        </>
    )
}
export default Users
