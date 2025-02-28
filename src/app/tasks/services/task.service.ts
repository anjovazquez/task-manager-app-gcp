// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, Timestamp } from '@angular/fire/firestore';
import { Functions, httpsCallable, FunctionsInstances } from '@angular/fire/functions';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { inject } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    tasks$ = this.tasksSubject.asObservable();

    constructor(private firestore: Firestore, private functions: Functions) {
        this.firestore = inject(Firestore);
        this.getTasks();
    }

    async addTask(task: Task): Promise<void> {
        const addTaskCallable = httpsCallable(this.functions, 'addTask');
        addTaskCallable(task).then((result: any) => this.getTasks());

    }

    // Update an existing task
    async editTask(updatedTask: Task): Promise<void> {
        const addTaskCallable = httpsCallable(this.functions, 'editTask');
        addTaskCallable({ ...updatedTask, taskId: updatedTask.id }).then((result: any) => this.getTasks());
    }

    // Delete a task
    async deleteTask(taskId: string): Promise<void> {
        const addTaskCallable = httpsCallable(this.functions, 'deleteTask');
        addTaskCallable({ id: taskId }).then((result: any) => this.getTasks());
    }

    getTasks(): void {
        const listTaskCallable = httpsCallable(this.functions, 'listTasks');
        listTaskCallable({
            "pageSize": 5,
            "filterCompleted": false,
            "sortBy": "dueDate",
            "sortDirection": "desc"
        }).then((result: any) => {

            const tasks = result.data.tasks.map((task: any) => {
                return {
                    id: task.id, // Get document ID
                    title: task['title'],
                    description: task['description'],
                    //dueDate: task.dueDatetask.dueDate?.toDate(),
                    completed: task['completed'],
                } as Task;
            })
            this.tasksSubject.next(tasks)
        })
    }
}
