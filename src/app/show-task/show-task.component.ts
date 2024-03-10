import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-show-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './show-task.component.html',
  styleUrl: './show-task.component.css'
})
export class ShowTaskComponent {
  tasks: string[] = ['task 1', 'task 2', 'task 3']
}
