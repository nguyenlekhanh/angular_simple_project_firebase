

import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../Models/Task";
import { Subject, map } from "rxjs";
import { AuthResponse } from "../Models/AuthResponse";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http: HttpClient = inject(HttpClient);

    //firebase.google.com/docs/reference/rest/auth#section-create-email-password
    signup(email, password) {
        const data = {email: email, password: password, returnSecureToken: true};

        return this.http.post<AuthResponse>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=', data
                );


    }


}