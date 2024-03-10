import { Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent {
  ngOnInit() {
    // let obs = new Observable((observer) => {observer.next(Math.random())});

    // const subject = new Subject();
    //const subject = new BehaviorSubject<number>(100);

    // const subject = new ReplaySubject(2, 1000);
    // subject.next(100);
    // subject.next(200);
    // subject.next(300);

    // subject.subscribe((data) => {console.log(data)});

    // subject.subscribe((data) => {console.log(data)});

    // subject.next(Math.random());  //return the same number

    //AJAX CALL
    // const subject = new Subject();
    // const data = ajax('https://randomuser.me/api/');

    // subject.subscribe((res) => {console.log(res)});
    // subject.subscribe((res) => {console.log(res)});

    // data.subscribe(subject);  //only call ajax 1 time

    const asyncSubject = new AsyncSubject();

    asyncSubject.next(100);
    asyncSubject.next(200);

    asyncSubject.subscribe(data => console.log(data));

    asyncSubject.complete();
    asyncSubject.next(300);
  }
}
