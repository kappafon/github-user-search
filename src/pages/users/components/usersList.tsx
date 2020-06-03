import React from 'react'
import { UsersInfo } from '../usersPage'
import { Link } from 'react-router-dom'
import { USERS_PAGE } from '../../../assets/strings/strings'
import './usersList.scss'

const isProduction = process.env.NODE_ENV === 'production'

//#region Interfaces
export interface UsersListProps {
    users: Array<UsersInfo>
}

//#endregion Interfaces

const UsersList: React.FunctionComponent<UsersListProps> = (props) => {
    const { userImageAlt } = USERS_PAGE
    const { users } = props

    return (
        <>
            {users.map((user) => {
                const { login, avatarUrl } = user
                const alt = `${login}${userImageAlt}`
                const href = isProduction
                    ? `/github-user-search/profile/${login}`
                    : `/profile/${login}`
                return (
                    <Link key={login} to={href} className="user__box">
                        <img className="user__image" src={avatarUrl} alt={alt} width={128} />
                        <div className="user__username">{login}</div>
                    </Link>
                )
            })}
        </>
    )
}
export default UsersList
