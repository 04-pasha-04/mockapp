import React, { useState, useEffect } from 'react';
import { Task } from '../../interfaces';

interface ItemFormProps {
    show: boolean;
    handleClose: () => void;
    userId: string; // Added userId prop
    addOrEditTask: (task: Partial<Task>) => void;
    editTask: Task | null;
}

const ItemForm: React.FC<ItemFormProps> = ({ show, handleClose, addOrEditTask, editTask }) => {
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [dueDate, setDueDate] = useState<string>('');

    useEffect(() => {
        if (editTask) {
            setTaskTitle(editTask.title || '');
            setTaskDescription(editTask.description || '');
            setSelectedTags(editTask.priority ? editTask.priority.split(', ') : []);
            setDueDate(editTask.dueDate ? new Date(editTask.dueDate).toISOString().split('T')[0] : '');
        } else {
            setTaskTitle('');
            setTaskDescription('');
            setSelectedTags([]);
            setDueDate('');
        }
    }, [editTask]);

    const availableTags = ['Work', 'Personal', 'Urgent', 'Important', 'Low Priority', 'High Priority'];

    const handleTagChange = (tag: string) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Partial<Task> = {
            title: taskTitle,
            description: taskDescription,
            priority: selectedTags.join(', '),
            dueDate,
            completed: false,
        };

        addOrEditTask(newTask);
    };

    return (
        <div>
            {show && (
                <div className="modal d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editTask ? 'Edit Task' : 'Add Task'}</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="taskTitleInput">Task Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="taskTitleInput"
                                            placeholder="Enter task title"
                                            value={taskTitle}
                                            onChange={(e) => setTaskTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="taskDescriptionInput">Task Description</label>
                                        <textarea
                                            className="form-control"
                                            id="taskDescriptionInput"
                                            placeholder="Enter task description"
                                            value={taskDescription}
                                            onChange={(e) => setTaskDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Tags</label>
                                        <div className="d-flex flex-wrap">
                                            {availableTags.map(tag => (
                                                <div key={tag} className="form-check me-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={tag}
                                                        id={`tag-${tag}`}
                                                        onChange={() => handleTagChange(tag)}
                                                        checked={selectedTags.includes(tag)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`tag-${tag}`}>
                                                        {tag}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="dueDateInput">Due Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dueDateInput"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">{editTask ? 'Update Task' : 'Save Task'}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemForm;
