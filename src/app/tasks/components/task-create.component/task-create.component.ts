import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { Task } from '../../models/task.model';

@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    styleUrls: ['./task-create.component.scss'],
    standalone: true,
    imports: [
        SharedModule,
    ],
})
export class TaskCreateComponent {
    id
    title: string = '';
    description: string = '';
    dueDate: string = '';
    completed: boolean = false;

    constructor(public dialogRef: MatDialogRef<TaskCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: Task | null) {
        if (data) {
            this.id = data.id;
            this.title = data.title;
            this.description = data.description;
            this.dueDate = data.dueDate ? this.formatDate(data.dueDate) : '';
            this.completed = data.completed;
        }
    }

    saveTask(): void {

        if (this.id) {
            const updatedTask = {
                id: this.id,
                title: this.title,
                description: this.description,
                dueDate: this.dueDate,
                completed: this.completed
            };
            this.dialogRef.close(updatedTask);
        }
        else {
            const newTask = {
                title: this.title,
                description: this.description,
                dueDate: this.dueDate,
                completed: this.completed
            };
            this.dialogRef.close(newTask);
        }
    }

    cancel(): void {
        this.dialogRef.close(); // Close the modal without saving
    }

    private formatDate(date: any): string {
        if (!date) return '';

        // If it's a Firestore Timestamp, convert it
        if (date.toDate) {
            return date.toDate().toISOString().split('T')[0]; // Extract YYYY-MM-DD
        }

        // If it's already a Date object
        if (date instanceof Date) {
            return date.toISOString().split('T')[0];
        }

        // If it's already a string in the correct format
        return date;
    }
}