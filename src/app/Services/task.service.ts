

import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Task } from "../Models/Task";
import { Subject, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    //http: HttpClient = inject(HttpClient);
    allTasks: Task[] = [];
    errorSubject = new Subject<HttpErrorResponse>;

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
        .subscribe({
            error: (err) => {
                this.errorSubject.next(err);
            }
          });
    }

    DeleteAllTask() {
        this.http.delete("https://thematic-garage-625.firebaseio.com/tasks.json")
        .subscribe({
            error: (err) => {
                this.errorSubject.next(err);
            }
          });
    }

    GetAllTask() {
        return this.http.get<{[key: string]: Task}>("https://thematic-garage-625.firebaseio.com/tasks.json")
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
        );
    }

    UpdateTaskById(id: string | undefined, data: Task) {
        this.http.put("https://thematic-garage-625.firebaseio.com/tasks/" + id + ".json", data)
        .subscribe(() => {
            this.fetchAllTasks();
        });
    }
}