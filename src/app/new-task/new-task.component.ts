import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule

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
}
