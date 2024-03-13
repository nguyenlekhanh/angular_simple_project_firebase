import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptorServiceInterceptor } from './Services/auth-interceptor.service';
import { LoggingInterceptorService } from './Services/logging-Interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(
      withInterceptors(
        [
          authInterceptorServiceInterceptor, 
          LoggingInterceptorService
        ]
      )
    )
  ],
};
