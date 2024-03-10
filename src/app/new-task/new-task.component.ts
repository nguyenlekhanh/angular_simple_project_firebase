import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  newTask: string = '';
  taskService: TaskServiceService = inject(TaskServiceService);

  OnCreateTask() {
    console.log(this.newTask);
    this.taskService.OnCreateTask(this.newTask);
  }
}
