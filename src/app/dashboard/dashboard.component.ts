import { Component, inject } from '@angular/core';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Task } from '../Models/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { TaskService } from '../Services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateTaskComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  allTasks: Task[] = [];
  taskService: TaskService = inject(TaskService);

  ngOnInit() {
    this.fetchAllTasks();
  }

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  CreateTask(data: Task) {
    this.taskService.CreateTask(data);
  }

  FetchAllTaskCLicked() {
    this.fetchAllTasks();
  }

  private fetchAllTasks() {
    this.taskService.GetAllTask().subscribe((tasks) => {
      console.log(tasks);
      this.allTasks = tasks;
    });
  }

  DeleteTask(id: string | undefined) {
    this.taskService.DeleteTask(id);
  }

  DeleteAllTask() {
    this.taskService.DeleteAllTask();
  }

}
