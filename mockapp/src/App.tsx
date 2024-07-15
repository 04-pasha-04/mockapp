// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ItemForm from './components/ItemForm/ItemForm';
import UserList from './components/UserList/UserList';
import TaskList from './components/TaskList/TaskList';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import axios from 'axios';
import { User, Task } from './interfaces';

const apiUrl = 'https://66913c4126c2a69f6e8f0897.mockapi.io/api'; // Replace with your MockAPI URL

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<Task | null>(null); // Added this state for the task to be edited
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const handleClose = () => {
        setShow(false);
        setEditTask(null); // Clear the edit task state when closing the modal
    };

    const handleShow = () => setShow(true);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>(`${apiUrl}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchTasks = async (user: User) => {
        try {
            const response = await axios.get<Task[]>(`${apiUrl}/users/${user.id}/todos`);
            setTasks(response.data);
            setSelectedUser(user);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addUser = async (name: string) => {
        try {
            const response = await axios.post<User>(`${apiUrl}/users`, { name });
            setUsers([...users, response.data]);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            await axios.delete(`${apiUrl}/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
            if (selectedUser && selectedUser.id === userId) {
                setSelectedUser(null);
                setTasks([]);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const editUser = async (user: User) => {
        try {
            await axios.put<User>(`${apiUrl}/users/${user.id}`, { name: user.name });
            setUsers(users.map(u => u.id === user.id ? user : u));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const addOrEditTask = async (task: Partial<Task>) => {
        if (editTask) {
            // Edit task
            try {
                const response = await axios.put<Task>(`${apiUrl}/users/${selectedUser?.id}/todos/${editTask.id}`, { ...task, priority: task.priority || '' });
                setTasks(tasks.map(t => t.id === editTask.id ? response.data : t));
                handleClose();
            } catch (error) {
                console.error('Error editing task:', error);
            }
        } else {
            // Add task
            try {
                const response = await axios.post<Task>(`${apiUrl}/users/${selectedUser?.id}/todos`, { ...task, priority: task.priority || '' });
                setTasks([...tasks, response.data]);
                handleClose();
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await axios.delete(`${apiUrl}/users/${selectedUser?.id}/todos/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const completeTask = async (task: Task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            const response = await axios.put<Task>(`${apiUrl}/users/${selectedUser?.id}/todos/${task.id}`, updatedTask);
            setTasks(tasks.map(t => t.id === task.id ? response.data : t));
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const editTaskHandler = (task: Task) => {
        setEditTask(task);  // Set the task to be edited
        handleShow();  // Show the form
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Apply the theme to the body
    useEffect(() => {
        document.body.setAttribute('data-bs-theme', theme);
    }, [theme]);

    return (
        <Router>
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Todo List</h1>
                    <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
                </div>
                <Routes>
                    <Route path="/" element={
                        <UserList
                            users={users}
                            onSelectUser={fetchTasks}
                            onAddUser={addUser}
                            onDeleteUser={deleteUser}
                            onEditUser={editUser}
                        />
                    } />
                    <Route path="/tasks/:userId" element={
                        <TaskList
                            tasks={tasks}
                            user={selectedUser}
                            handleShow={handleShow}
                            onDeleteTask={deleteTask}
                            onCompleteTask={completeTask}
                            onEditTask={editTaskHandler}  // Pass the editTask function
                        />
                    } />
                </Routes>

                {selectedUser && (
                    <ItemForm
                        show={show}
                        handleClose={handleClose}
                        userId={selectedUser.id}
                        addOrEditTask={addOrEditTask}
                        editTask={editTask}  // Pass the selected task for editing
                    />
                )}

                
            </div>
        </Router>
    );
};

export default App;
