import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../Models/User';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  @Input() userToDelete: User;

  @Output()
  OnConfirmation: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
  }

  OnConfirmationBtnClick(value: boolean) {
    console.log(value);
    this.OnConfirmation.emit(value);
  }
}
