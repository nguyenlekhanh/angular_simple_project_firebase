import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common'; //ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';

// import { HeaderComponent } from './header/header.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { ContainerComponent } from './container/container.component';
import { Observable, from, fromEvent, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { NewTaskComponent } from './new-task/new-task.component';
import { ShowTaskComponent } from './show-task/show-task.component';
import { SubjectComponent } from './subject/subject.component';

import { UbsubscribeComponent } from './ubsubscribe/ubsubscribe.component';

import { UsersComponent } from './users/users.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    HeaderComponent,
    TopHeaderComponent,
    ContainerComponent,
    NewTaskComponent,
    ShowTaskComponent,
    SubjectComponent,
    UbsubscribeComponent,
    UsersComponent,
    FooterComponent,
    DashboardComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'angular_project';
  title = 'Observables';

  data: any[] = [];

  // myObserable = new Observable(observer => {
  //   observer.next([1,2,3,4,5])
  // });

  // GetAsyncData() {
  //   //Observer
  //   //next, error, complete
  //   this.myObserable.subscribe((val: any) => {
  //     this.data = val;
  //   });
  // }
  //-------------------------
  // myObserable = new Observable(observer => {
  //   observer.next(1);
  //   observer.next(2);
  //   observer.next(3);
  //   observer.next(4);
  //   observer.next(5);
  // });

  // GetAsyncData() {
  //   //Observer
  //   //next, error, complete
  //   this.myObserable.subscribe((val: any) => {
  //     this.data.push(val);
  //   });
  // }
  //---------------------------

  // myObserable = new Observable(observer => {
  //   setTimeout(() => {observer.next(1)}, 1000);
  //   setTimeout(() => {observer.next(2)}, 2000);
  //   setTimeout(() => {observer.next(3)}, 3000);
  //   //setTimeout(() => {observer.error(new Error("Something went wrong"))}, 4000);
  //   setTimeout(() => {observer.next(4)}, 4000);
  //   setTimeout(() => {observer.next(5)}, 5000);
  //   setTimeout(() => {observer.complete()}, 6000);
  // });

  //------------------------
  array1 = [1,3,5,7,9];
  array2 = ['A', 'B', 'C', 'D'];

  // myObserable = of(this.array1, this.array2, 20, 30, 'Hello');
  //myObserable = from(this.array1);  //return each item
  //myObserable = from('23456'); //return each number

  promiseData = new Promise((resolve, reject) => {
    resolve([10,20,30,40,50]);
  });

  // myObserable = from(this.promiseData); //return array
  myObserable = from([2,4,6,8,10, 12]).pipe(map((val) => {
    return val*10;
  }), filter((val, i) => {
    return val % 4 === 0;
  }));;

  // transformedObs = this.myObserable.pipe(map((val) => {
  //   return val*10;
  // }), filter((val, i) => {
  //   return val % 4 === 0;
  // }));

  // filteredObs = this.transformedObs.pipe(filter((val, i) => {
  //   return val % 4 === 0;
  // }));


  GetAsyncData() {
    //Observer
    //next, error, complete
    // this.myObserable.subscribe((val: any) => {
    //   this.data.push(val);
    // },
    // (err) => {
    //   alert(err.message);
    // },
    // () => {
    //   alert("All data is streamed");
    // });

    this.myObserable.subscribe({
      next: (val: any) => {
        this.data.push(val);
        console.log(val);
      },
      error(err) {
        alert(err.message);
      },
      complete() {
        alert("All data is streamed");
      }
    })
  }

  @ViewChild('createbtn')
  createBtn: ElementRef

  createBtnObs;

  buttonClicked() {
    let count = 0;
    // this.createBtnObs = fromEvent(this.createBtn.nativeElement, 'click').subscribe((data) => {
    //   console.log(data);
    //   this.showItem(count++);
    // });
  }

  ngAfterViewInit() {
    this.buttonClicked();
  }

  showItem(val) {
    let div = document.createElement('div');
    div.innerText = 'Item' + val;
    document.getElementById('container').appendChild(div);
  }
}
