import { Component } from '@angular/core';

import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { UserService } from '../Services/user.service';
import { User } from '../Models/User';

import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDeleteComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private userService: UserService) { 

  }

  users: User[] = [];
  showConfirmDeleteComponent: boolean = false;
  userToDelete: User;

  ngOnInit() {
    this.users = this.userService.users;
  }

  OnDeleteClicked(user: User) {
    // this.showConfirmDeleteComponent = true;
    // this.userToDelete = user;
    this.showConfirmDelete(user);
  }

  OnUserDeleteConfirmed(value: boolean) {
    this.showConfirmDeleteComponent = false;

    if(value) {
      //Delete user
      let indexUserdelete = this.userService.users.indexOf(this.userToDelete);

      this.userService.users.splice(indexUserdelete, 1);
    }
  }

  showConfirmDelete(user: User) {

  }
}
