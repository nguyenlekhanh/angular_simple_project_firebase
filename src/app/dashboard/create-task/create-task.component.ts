import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule
import { Task } from '../../Models/Task';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  OnFormSubmitted(form: NgForm) {
    console.log(form);
    this.EmitTaskData.emit(form.value);
    this.OnCloseForm();
  }
}
