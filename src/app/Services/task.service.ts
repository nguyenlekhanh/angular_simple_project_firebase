

import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Task } from "../Models/Task";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    //http: HttpClient = inject(HttpClient);
    allTasks: Task[] = [];

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
          .subscribe((response) => {
              //console.log(response);
              this.fetchAllTasks();
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
        .subscribe(() => {
            this.fetchAllTasks();
        });
    }

    DeleteAllTask() {
        this.http.delete("https://thematic-garage-625.firebaseio.com/tasks.json")
        .subscribe(() => {
            this.fetchAllTasks();
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