import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

import { LoaderComponent } from '../utility/loader/loader.component';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../utility/snackbar/snackbar.component';
import { Observable } from 'rxjs';
import { AuthResponse } from '../Models/AuthResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    LoaderComponent,
    SnackbarComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginMode: boolean = true;
  authService: AuthService = inject(AuthService);
  isLoading: boolean = false;
  errorMessage: string | null = null;
  authObs: Observable<AuthResponse>;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmitted(form: NgForm) {
    console.log(form.value);

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if(this.isLoginMode) {
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.signup(email, password);
    }

    this.authObs.subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
      },
      error: (errMsg) => {

        this.isLoading = false;
        this.errorMessage = errMsg;

        this.hideSnackbar();
      }
    });

    form.reset();
  }

  hideSnackbar() {
    setTimeout(() => {
      this.errorMessage = "";
    }, 3000);
  }
}
