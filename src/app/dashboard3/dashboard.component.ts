import { Component, inject } from '@angular/core';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Task } from '../Models/Task';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { TaskService } from '../Services/task.service';

import { TaskDetailsComponent } from './task-details/task-details.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateTaskComponent,
    TaskDetailsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showTaskDetails: boolean = false;
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  allTasks: Task[] = [];
  taskService: TaskService = inject(TaskService);
  selectedTask: Task;
  isEditMode: boolean = false;
  currentTaskId: string;
  isLoading: boolean = false;

  errorMessage: string |  null = null;
  errorSub: Subscription;

  currentTask: Task | null = null;

  ngOnInit() {
    this.fetchAllTasks();
    this.errorSub = this.taskService.errorSubject.subscribe({
      next: (httpError) => {
        this.setErrorMessage(httpError);
      }
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  OpenCreateTaskForm(){
    
    this.selectedTask = {title: '', desc: '', assignedTo: '', createdAt: '', priority: '', status: ''};
    this.showCreateTaskForm = true;
  }

  showCurrentTaskDetail(id: string | undefined) {
    this.showTaskDetails = true;
    this.taskService.getTaskDetail(id)
      .subscribe({
        next: (data: Task) => {
          this.currentTask = data;
        }
      });
  }

  CloseTaskDetail() {
    this.showTaskDetails = false;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  CreateOrUpdateTask(data: Task) {
    if(this.isEditMode) {
      this.taskService.UpdateTaskById(this.currentTaskId, data);
    } else {
      this.taskService.CreateTask(data);
    }
  }

  FetchAllTaskCLicked() {
    this.fetchAllTasks();
  }

  private fetchAllTasks() {
    this.isLoading = true;
    this.taskService.GetAllTask().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.isLoading = false;
      }, error: (error) => {
        //this.errorMessage = error.message;
        this.setErrorMessage(error);
        this.isLoading = false;
      }
    });
  }

  private setErrorMessage(err: HttpErrorResponse) {
    //console.log(err);
    if(err.error.err === 'Permission denied') {
      this.errorMessage = 'You do not have permission to perform this action'
    } else {
      this.errorMessage = err.message;
    }
  }


  DeleteTask(id: string | undefined) {
    this.taskService.DeleteTask(id);
  }

  DeleteAllTask() {
    this.taskService.DeleteAllTask();
  }

  UpdateTaskById(id: string | undefined) {
    this.selectedTask = this.allTasks.find((task) => task.id === id);
    this.currentTaskId = id;
    this.showCreateTaskForm = true;
    this.isEditMode = true;
    

    //this.taskService.UpdateTaskById(id);
  }
}
