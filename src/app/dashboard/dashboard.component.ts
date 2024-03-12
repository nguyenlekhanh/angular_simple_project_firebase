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
  selectedTask: Task;
  isEditMode: boolean = false;
  currentTaskId: string;

  ngOnInit() {
    this.fetchAllTasks();
  }

  OpenCreateTaskForm(){
    
    this.selectedTask = {title: '', desc: '', assignedTo: '', createdAt: '', priority: '', status: ''};
    this.showCreateTaskForm = true;
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

  UpdateTaskById(id: string | undefined) {
    this.selectedTask = this.allTasks.find((task) => task.id === id);
    this.currentTaskId = id;
    this.showCreateTaskForm = true;
    this.isEditMode = true;
    

    //this.taskService.UpdateTaskById(id);
  }
}
