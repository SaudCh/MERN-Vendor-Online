import React from 'react';

const UserList = ({ users, selected, setSelected }) => {

    return (
        <div className="user-list bg-white">
            {users.map((user, index) => {
                const isSelected = selected === user?.buyerId;
                return (
                    <button
                        onClick={() => setSelected(user?.buyerId)}
                        key={index} className={isSelected ? "bg-slate-50 flex p-2 w-[100%]" : "p-2 flex w-[100%] "}>
                        {user?.sellerInfo?.avatar ?
                            <img
                                className='w-10 h-10 rounded-full'
                                src={import.meta.env.VITE_SERVER_URL + user?.sellerInfo?.avatar}
                                alt=""
                            />
                            :
                            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                        }

                        <div className="ml-2 text-left">
                            <p className="text-lg font-semibold">{user?.sellerInfo?.name}</p>
                            <p className="text-sm">{user?.sellerInfo?.email}</p>
                        </div>

                    </button>
                )
            })}
        </div>
    );
}

export default UserList;
