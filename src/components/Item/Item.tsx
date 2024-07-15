import React from 'react';
import './Item.css';

interface ItemProps {
    task: {
        id: string;
        name: string;
        description: string;
        priority: string;
    };
}

const Item: React.FC<ItemProps> = ({ task }) => {
    return (
        <div className="item-card card mb-3">
            <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-text">
                    <small className="text-muted">Tags: {task.priority}</small>
                </p>
            </div>
        </div>
    );
};

export default Item;
