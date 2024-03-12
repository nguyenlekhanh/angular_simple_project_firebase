

import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../Models/Task";
import { Subject, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class LoggingService {
    http: HttpClient = inject(HttpClient);

    logError(data: {statusCode: number, errorMessage: string, datetime: Date}) {
        this.http.post('https://thematic-garage-625.firebaseio.com/log.json', data)
        .subscribe();

    }

    fetchErrors() {
        this.http.get('https://thematic-garage-625.firebaseio.com/log.json')
        .subscribe((data) => {
            console.log(data);
        });
    }
}