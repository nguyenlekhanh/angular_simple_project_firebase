import { Injectable, inject } from "@angular/core";
import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { HttpInterceptorFn } from '@angular/common/http';
import { Observable, exhaustMap, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

// export const authInterceptorServiceInterceptor: HttpInterceptorFn = (
//   req: HttpRequest<any>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<any>> => {
//   const authService: AuthService = inject(AuthService);

//   return authService.firebaseUser.pipe(take(1), exhaustMap(user => {

//     const modifiedReq = req.clone({
//       params: new HttpParams().set('auth',user.token)
//     });
//     return next(modifiedReq);
//   }));
//   // console.log('abc');
//   // return next(req);

//   // const cookieService = inject(CookieService);
//   // const token = cookieService.get('your-token');
//   // if (token) {
//   //   const cloned = req.clone({
//   //     setHeaders: {
//   //       authorization: token,
//   //     },
//   //   });
//   //   return next(cloned);
//   // } else {
//   //   return next(req);
//   // }
// };

export const authInterceptorServiceInterceptor: HttpInterceptorFn = (req, next) => {
    //const modifiedReq = req.clone({headers: req.headers.append('auth', 'abcccc')});

    const authService: AuthService = inject(AuthService);

    return authService.firebaseUser.pipe(take(1), exhaustMap(user => {

      if(!user) {
        return next(req);
      }

      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user.token)
      });

      return next(modifiedReq);
    }));

  // return next(modifiedReq).pipe(
  //   tap((event) => {
  //       if(event.type === HttpEventType.Response) {
  //           console.log('Response has arrived. Response data: ');
  //           console.log(event.body);
  //       }
  //   })
  // );
};

// export class AuthInterceptorService implements HttpInterceptor{
//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//         console.log('Auth Interceptor called!');
//         return next.handle(req);
//     }
// }