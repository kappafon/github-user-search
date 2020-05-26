import React from 'react'
import { Link } from 'react-router-dom'

export interface UsersProps {
    users?: Array<any>
}

const Users: React.FunctionComponent<UsersProps> = (props) => {
    const onUserClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        console.log(event.currentTarget.id)
    }
    return (
        <div>
            {props.users.map((user) => {
                const { login, id, avatarUrl } = user.node
                const alt = `${login}'s profile picture.`
                return (
                    <Link key={id} to={'/profile/' + login}>
                        <span onClick={onUserClick} id={login}>
                            <img src={avatarUrl} alt={alt} width={128} />
                            <div>{login}</div>
                        </span>
                    </Link>
                )
            })}
        </div>
    )
}
export default Users
