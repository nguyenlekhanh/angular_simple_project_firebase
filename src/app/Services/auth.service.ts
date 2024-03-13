

import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../Models/Task";
import { Subject, catchError, map, throwError } from "rxjs";
import { AuthResponse } from "../Models/AuthResponse";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http: HttpClient = inject(HttpClient);
    error: string | null = null;

    //firebase.google.com/docs/reference/rest/auth#section-create-email-password
    signup(email, password) {
        const data = {email: email, password: password, returnSecureToken: true};

        return this.http.post<AuthResponse>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjhVbSlKb_mSBT7z24-Bejlqm8x3slrLY', data
                ).pipe(
                    catchError(this.handleError)
                );


    }


    login(email, password) {
        const data = {email: email, password: password, returnSecureToken: true};

        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=', data
        ).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err) {
        let errorMessage = 'An unknown error has occured';
        if(!err.error || ! err.error.error) {
            return throwError(() => errorMessage);
        }
        switch(err.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email already exists.";
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage= "This operation is not allowed."
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage= "This email does not exist"
                break;
            case 'INVALID_PASSWORD':
                errorMessage= "Provided password is incorrect."
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage= "The email ID or password is not correct."
                break;
        }

        return throwError(() => errorMessage);
    }
}