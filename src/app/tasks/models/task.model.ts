// src/app/models/task.model.ts
export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
}
