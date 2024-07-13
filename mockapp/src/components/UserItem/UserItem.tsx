import React, { useState } from 'react';

interface User {
    id: string;
    name: string;
}

interface UserItemProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
    onSelect: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onEdit, onDelete, onSelect }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user.name);

    const handleEdit = () => {
        onEdit({ ...user, name: newName });
        setIsEditing(false);
    };

    return (
        <li
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={onSelect}
            style={{ cursor: 'pointer' }}
        >
            {isEditing ? (
                <>
                    <input
                        type="text"
                        className="form-control me-2"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button className="btn btn-primary me-2" onClick={(e) => { e.stopPropagation(); handleEdit(); }}>Save</button>
                    <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); setIsEditing(false); }}>Cancel</button>
                </>
            ) : (
                <>
                    <span>{user.name}</span>
                    <div>
                        <button className="btn btn-primary me-2" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Edit</button>
                        <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); onDelete(user.id); }}>Delete</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default UserItem;
