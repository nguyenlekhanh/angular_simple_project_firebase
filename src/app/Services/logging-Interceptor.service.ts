import { Injectable } from "@angular/core";
import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from "rxjs";

export const LoggingInterceptorService: HttpInterceptorFn = (req, next) => {
    console.log("Request sent to URL: " + req.url);
    return next(req);
};
