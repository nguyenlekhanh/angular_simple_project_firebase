

import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../Models/Task";
import { BehaviorSubject, Subject, catchError, map, tap, throwError } from "rxjs";
import { AuthResponse } from "../Models/AuthResponse";
import { FirebaseUser } from "../Models/firebaseUser";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http: HttpClient = inject(HttpClient);
    error: string | null = null;
    firebaseUser = new BehaviorSubject<FirebaseUser>(null);
    router: Router = inject(Router);
    private tokenExpiretimer: any;

    //firebase.google.com/docs/reference/rest/auth#section-create-email-password
    signup(email, password) {
        const data = {email: email, password: password, returnSecureToken: true};

        return this.http.post<AuthResponse>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjhVbSlKb_mSBT7z24-Bejlqm8x3slrLY', data
                ).pipe(
                    catchError(this.handleError),
                    tap(this.handleCreateUser)
                );


    }

    login(email, password) {
        const data = {email: email, password: password, returnSecureToken: true};

        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjhVbSlKb_mSBT7z24-Bejlqm8x3slrLY', data
        ).pipe(
            catchError(this.handleError),
            tap(this.handleCreateUser)
        );
    }

    logout() {
        this.firebaseUser.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('user');

        if(this.tokenExpiretimer) {
            clearTimeout(this.tokenExpiretimer);
        }

        this.tokenExpiretimer = null;
    }

    autoLogin() {
        const user = JSON.parse(localStorage.getItem('user'));

        if(!user) {
            return;
        }

        const loggedUser = new FirebaseUser(user.email, user.id, user._token, user.expiredIn);

        if(loggedUser.token) {
            this.firebaseUser.next(loggedUser);
            const timerValue = user._expiresIn.getTime() - new Date().getTime();
            this.autoLogout(timerValue);
        }
    }

    autoLogout(expireTime: number) {
        this.tokenExpiretimer = setTimeout(() => {
            this.logout();
        }, expireTime);
    }

    private handleCreateUser(res) {
        const expiredInTs = new Date().getTime() + +res.expiresIn * 1000;
        //res.expiresIn - second
        //+res.expiresIn * 1000 - milisecond
        const expiredIn = new Date(expiredInTs);

        const user = new FirebaseUser(res.email, res.localId, res.idToken, expiredIn)

        this.firebaseUser.next(user);
        this.autoLogout(res.expiredIn * 1000);

        localStorage.setItem('user', JSON.stringify(user));
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