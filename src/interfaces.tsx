// src/interfaces.ts
export interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    completed: boolean;
    dueDate: string;
}

export interface User {
    id: string;
    name: string;
}
