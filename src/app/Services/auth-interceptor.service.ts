import { Injectable } from "@angular/core";
import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from "rxjs";

export const authInterceptorServiceInterceptor: HttpInterceptorFn = (req, next) => {
    const modifiedReq = req.clone({headers: req.headers.append('auth', 'abcccc')});
  console.log("Auth Interceptor called!");
  return next(modifiedReq).pipe(
    tap((event) => {
        if(event.type === HttpEventType.Response) {
            console.log('Response has arrived. Response data: ');
            console.log(event.body);
        }
    })
  );
};

// export class AuthInterceptorService implements HttpInterceptor{
//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//         console.log('Auth Interceptor called!');
//         return next.handle(req);
//     }
// }