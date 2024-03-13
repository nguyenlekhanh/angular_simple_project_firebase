import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorServiceInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Auth Interceptor called!");
  return next(req);
};

// export class AuthInterceptorService implements HttpInterceptor{
//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//         console.log('Auth Interceptor called!');
//         return next.handle(req);
//     }
// }