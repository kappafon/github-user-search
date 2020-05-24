import React from 'react'

export interface UsersProps {
    users?: Array<any>
}

const Users: React.FunctionComponent<UsersProps> = (props) => {
    const { users } = props
    return (
        <div>
            {!!users.length &&
                users.map((user, index) => {
                    return <div key={index}>{user.node.login}</div>
                })}
        </div>
    )
}
export default Users
