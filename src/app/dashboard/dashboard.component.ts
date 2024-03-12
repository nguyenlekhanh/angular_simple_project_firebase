import { Component, inject } from '@angular/core';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Task } from '../Models/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateTaskComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  allTasks: Task[] = [];

  ngOnInit() {
    this.fetchAllTasks();
  }

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  CreateTask(data: Task) {
    console.log(data);
    // this.http.post("https://thematic-garage-625.firebaseio.com/tasks.json", data)
    //   .subscribe((response) => {
    //       console.log(response);
    //   });

    const headers = new HttpHeaders({'my-header': 'hello-world'});

    this.http.post<{name: string}>(
        "https://thematic-garage-625.firebaseio.com/tasks.json", 
        data, {headers: headers})
      .subscribe((response) => {
          console.log(response);
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



}
