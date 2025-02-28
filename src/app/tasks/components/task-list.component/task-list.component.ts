import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { TaskCreateComponent } from '../task-create.component/task-create.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
  ],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(public dialog: MatDialog, private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit(): void { }

  openAddTaskForm(): void {
    const dialogRef = this.dialog.open(TaskCreateComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(async (newTask) => {
      if (newTask) {
        await this.taskService.addTask(newTask);
      }
    });
  }

  // Edit a task
  openEditTaskForm(task: Task): void {
    const dialogRef = this.dialog.open(TaskCreateComponent, {
      width: '650px',
      data: { ...task }, // Pass the task data to pre-fill the form
    });

    dialogRef.afterClosed().subscribe((updatedTask) => {
      if (updatedTask) {
        this.taskService.editTask(updatedTask);
      }
    });
  }

  // Delete a task
  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }
}
