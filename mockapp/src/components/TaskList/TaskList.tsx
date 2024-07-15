import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Task, User } from '../../interfaces';

interface TaskListProps {
    tasks: Task[];
    user: User | null;
    handleShow: () => void;
    onDeleteTask: (taskId: string) => void;
    onCompleteTask: (task: Task) => void;
    onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, user, handleShow, onDeleteTask, onCompleteTask, onEditTask }) => {
    const navigate = useNavigate();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div>
            <div className="d-flex align-items-center mb-4">
                <button
                    className="btn btn-primary me-3"
                    onClick={() => navigate('/')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.5 8a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1H2a.5.5 0 0 1-.5-.5z"/>
                        <path fillRule="evenodd" d="M5.354 3.354a.5.5 0 0 1 0 .707L2.707 7l2.647 2.646a.5.5 0 0 1-.707.707L1.5 7.707a.5.5 0 0 1 0-.707L4.646 3.354a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <h2>Tasks for {user ? user.name : 'User'}</h2>
            </div>

            <div className="mb-4">
                <div className="progress">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${completionPercentage}%` }}
                        aria-valuenow={completionPercentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        {completionPercentage}%
                    </div>
                </div>
                <p className="text-center mt-2">
                    {completedTasks} of {totalTasks} tasks completed
                </p>
            </div>

            <div className="mt-4">
                {tasks.map(task => (
                    <div key={task.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">
                                {task.completed ? <del>{task.title}</del> : task.title}
                            </h5>
                            <p className="card-text">{task.description}</p>
                            <p className="card-text">
                                <small className="text-muted">Tags: {task.priority}</small><br />
                                <small className="text-muted">Due: {new Date(task.dueDate).toLocaleDateString()}</small>
                            </p>
                            <button
                                className="btn btn-success me-2"
                                onClick={() => onCompleteTask(task)}
                            >
                                {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
                            </button>
                            <button
                                className="btn btn-outline-primary me-2"
                                onClick={() => onEditTask(task)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => onDeleteTask(task.id)}
                            >
                                Delete
                            </button>
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
