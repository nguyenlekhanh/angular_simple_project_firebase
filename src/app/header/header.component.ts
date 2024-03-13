import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { FirebaseUser } from '../Models/firebaseUser';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);
  isLoggedIn: boolean = false;
  private userSubject: Subscription;

  ngOnInit() {
    this.userSubject = this.authService.firebaseUser.subscribe((user: FirebaseUser) => {
      this.isLoggedIn = user ? true : false;
    });
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }
}
