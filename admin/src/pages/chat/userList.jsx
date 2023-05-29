import React from 'react';

const UserList = () => {
    const users = ['User 1', 'User 2', 'User 3']; // Example array of users

    return (
        <div className="user-list">
            {users.map((user, index) => (
                <div key={index} className="user">
                    {user}
                </div>
            ))}
        </div>
    );
}

export default UserList;
