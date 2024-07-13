import React from 'react';
import { useParams } from 'react-router-dom';

interface Task {
    id: string;
    name: string;
    description: string;
    priority: string;
}

interface User {
    id: string;
    name: string;
}

interface TaskListProps {
    tasks: Task[];
    user: User | null;
    handleShow: () => void;  // Add this prop for showing the ItemForm component
}

const TaskList: React.FC<TaskListProps> = ({ tasks, user, handleShow }) => {
    const { userId } = useParams<{ userId: string }>();

    return (
        <div>
            <div className="mt-4">
                <h2>Tasks for {user ? user.name : 'User'}: {userId}</h2>
                {tasks.map(task => (
                    <div key={task.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{task.name}</h5>
                            <p className="card-text">{task.description}</p>
                            <p className="card-text">
                                <small className="text-muted">Priority: {task.priority}</small>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="floating-btn" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg>
            </div>
        </div>
    );
};

export default TaskList;
