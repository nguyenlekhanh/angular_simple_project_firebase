

import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Task } from "../Models/Task";
import { Subject, catchError, map, throwError } from "rxjs";
import { LoggingService } from "./Logging.Service";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    //http: HttpClient = inject(HttpClient);
    allTasks: Task[] = [];
    errorSubject = new Subject<HttpErrorResponse>;
    loggingService: LoggingService = inject(LoggingService);

    constructor(private http: HttpClient) {

    }
    CreateTask(data: Task) {
        //console.log(data);
        // this.http.post("https://thematic-garage-625.firebaseio.com/tasks.json", data)
        //   .subscribe((response) => {
        //       console.log(response);
        //   });
    
        const headers = new HttpHeaders({'my-header': 'hello-world'});
    
        this.http.post<{name: string}>(
            "https://thematic-garage-625.firebaseio.com/tasks.json", 
            data, {headers: headers})
        .pipe(catchError((err) => {
                const errorObj = {statusCode: err.status, errorMessage: err.message, datetime: new Date};
                this.loggingService.logError(errorObj);
                return throwError(() => err)
            }))
          .subscribe({
            error: (err) => {
                this.errorSubject.next(err);
            }
          });
    }

    FetchAllTaskCLicked() {
        this.fetchAllTasks();
    }

    private fetchAllTasks() {
        this.http.get<{[key: string]: Task}>("https://thematic-garage-625.firebaseio.com/tasks.json")
            .pipe(
                map((response) => {
                //TRANSFORM DATA
                    let tasks = [];

                    for(let key in response) {
                    if(response.hasOwnProperty(key)) {
                        tasks.push({...response[key], id: key});
                    }
                }

                return tasks;
            })
        )
        .subscribe((tasks) => {
            this.allTasks = tasks;
        })
    }

    DeleteTask(id: string | undefined) {
        this.http.delete("https://thematic-garage-625.firebaseio.com/tasks/" + id + ".json")
        .pipe(catchError((err) => {
            const errorObj = {statusCode: err.status, errorMessage: err.message, datetime: new Date};
            this.loggingService.logError(errorObj);
            return throwError(() => err)
        }))
        .subscribe({
            error: (err) => {
                this.errorSubject.next(err);
            }
          });
    }

    DeleteAllTask() {
        this.http.delete("https://thematic-garage-625.firebaseio.com/tasks.json")
        .pipe(catchError((err) => {
            const errorObj = {statusCode: err.status, errorMessage: err.message, datetime: new Date};
            this.loggingService.logError(errorObj);
            return throwError(() => err)
        }))
        .subscribe({
            error: (err) => {
                this.errorSubject.next(err);
            }
          });
    }

    GetAllTask() {
        let headers = new HttpHeaders();
        //headers = headers.set('content-type', 'application/json');
        //headers = headers.set('Access-Control-Allow-Origin', '*');
        headers = headers.append('content-type', 'application/json');
        headers = headers.append('Access-Control-Allow-Origin', '*');

        let queryParams = new HttpParams();
        queryParams = queryParams.set('page', 2);
        queryParams = queryParams.set('item', 10);

        return this.http.get<{[key: string]: Task}>("https://thematic-garage-625.firebaseio.com/tasks.json", {headers: headers, params: queryParams})
            .pipe(
                map((response) => {
                    //TRANSFORM DATA
                    let tasks = [];

                    for(let key in response) {
                    if(response.hasOwnProperty(key)) {
                        tasks.push({...response[key], id: key});
                    }
                }

                return tasks;
            }), catchError((err) => {
                const errorObj = {statusCode: err.status, errorMessage: err.message, datetime: new Date};
                this.loggingService.logError(errorObj);
                return throwError(() => err)
            })
        );
    }

    UpdateTaskById(id: string | undefined, data: Task) {
        this.http.put("https://thematic-garage-625.firebaseio.com/tasks/" + id + ".json", data)
        .pipe(catchError((err) => {
            const errorObj = {statusCode: err.status, errorMessage: err.message, datetime: new Date};
            this.loggingService.logError(errorObj);
            return throwError(() => err)
        }))
        .subscribe({
            error: (err) => {
                this.errorSubject.next(err);
            }
          });
    }

    getTaskDetail(id: string | undefined) {
        return this.http.get("https://thematic-garage-625.firebaseio.com/tasks/" + id + ".json")
        .pipe(map((response) => {
            //TRANSFORM DATA
            let task = {};
            task = {...response, id: id};
            return task;
        }));
    }
}