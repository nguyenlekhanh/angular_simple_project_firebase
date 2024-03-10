import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor() { }

  //CreateTask: EventEmitter<string> = new EventEmitter<string>();
  CreateTask = new Subject<string>();

  OnCreateTask(value: string) {
    this.CreateTask.next(value);
  }
}
