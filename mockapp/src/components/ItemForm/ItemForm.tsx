import React, { useState } from 'react';
import axios from 'axios';

interface ItemFormProps {
    show: boolean;
    handleClose: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ show, handleClose }) => {
    const [taskName, setTaskName] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Example tags; you can fetch these from an API or a predefined list
    const availableTags = ['Work', 'Personal', 'Urgent', 'Important', 'Low Priority', 'High Priority'];

    const handleTagChange = (tag: string) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTask = {
            name: taskName,
            description: taskDescription,
            tags: selectedTags,  // Include tags in the request payload
        };

        try {
            const response = await axios.post('https://YOUR_MOCKAPI_URL/tasks', newTask);
            console.log('Task added:', response.data);
            setTaskName('');
            setTaskDescription('');
            setSelectedTags([]);
            handleClose(); // Close the modal after submitting the form
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div>
            {show && (
                <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New Task</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="taskNameInput">Task Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="taskNameInput"
                                            placeholder="Enter task name"
                                            value={taskName}
                                            onChange={(e) => setTaskName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="taskDescriptionTextArea">Task Description</label>
                                        <textarea
                                            className="form-control"
                                            id="taskDescriptionTextArea"
                                            rows={3}
                                            placeholder="Enter task description"
                                            value={taskDescription}
                                            onChange={(e) => setTaskDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tagsSelect">Tags</label>
                                        <div id="tagsSelect">
                                            {availableTags.map((tag) => (
                                                <div className="form-check" key={tag}>
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id={`tag${tag}`}
                                                        checked={selectedTags.includes(tag)}
                                                        onChange={() => handleTagChange(tag)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`tag${tag}`}>
                                                        {tag}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add</button>
                                    <button type="button" className="btn btn-danger ml-auto" onClick={handleClose}>Exit</button>
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
