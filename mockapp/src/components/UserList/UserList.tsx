import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserItem from '../UserItem/UserItem';

interface User {
    id: string;
    name: string;
}

interface UserListProps {
    users: User[];
    onSelectUser: (user: User) => void;
    onAddUser: (name: string) => void;
    onDeleteUser: (userId: string) => void;
    onEditUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser, onAddUser, onDeleteUser, onEditUser }) => {
    const [search, setSearch] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

    const handleAddUser = () => {
        onAddUser(newUserName);
        setNewUserName('');
        setShowModal(false);
    };

    const handleUserSelect = (user: User) => {
        onSelectUser(user);
        navigate(`/tasks/${user.id}`);
    };

    return (
        <div>
            <h2>Select a User</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search users"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <ul className="list-group mb-3">
                {filteredUsers.map(user => (
                    <UserItem
                        key={user.id}
                        user={user}
                        onEdit={onEditUser}
                        onDelete={onDeleteUser}
                        onSelect={() => handleUserSelect(user)}
                    />
                ))}
            </ul>

            <div className="floating-btn" onClick={() => setShowModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg>
            </div>

            {showModal && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New User</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter user name"
                                    value={newUserName}
                                    onChange={e => setNewUserName(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleAddUser}>
                                    Add User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
