import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemForm from './components/ItemForm/ItemForm';
import UserList from './components/UserList/UserList';
import TaskList from './components/TaskList/TaskList';
import axios from 'axios';

interface User {
    id: string;
    name: string;
}

interface Task {
    id: string;
    name: string;
    description: string;
    priority: string;
}

const apiUrl = 'https://66913c4126c2a69f6e8f0897.mockapi.io/api'; // Replace with your MockAPI URL

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
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
            const response = await axios.get<Task[]>(`${apiUrl}/users/${user.id}/items`);
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

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Router>
            <div className="container mt-5">
                <h1 className="mb-4">Todo List</h1>
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
                        />
                    } />
                </Routes>
                <ItemForm show={show} handleClose={handleClose} />
            </div>
        </Router>
    );
};

export default App;
