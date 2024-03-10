import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor() { }

  CreateTask: EventEmitter<string> = new EventEmitter<string>();

  OnCreateTask(value: string) {
    this.CreateTask.emit(value);
  }
}
