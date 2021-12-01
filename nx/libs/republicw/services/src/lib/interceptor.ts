// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler,HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { ErrorDialogService } from './error-dialog/errordialog.service';

// @Injectable()
// export class RepublicInterceptor implements HttpInterceptor {

//     constructor(
//         public errorDialogService: ErrorDialogService,
//     ){}

    // intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     const token: any = localStorage.getItem('token');
    //     if( token ){
    //         httpRequest = httpRequest.clone( { headers: httpRequest.headers.set('Authorization', 'Bearer ' + token ) });
    //     }

        // return next.handle(httpRequest).pipe(
        //     map((event: HttpEvent<any>) => {
        //         if (event instanceof HttpResponse) {
        //             console.log('event--->>>', event);
        //         }
        //         return event;
        //     }),
        //     catchError((error: HttpErrorResponse) => {
        //         let data = {};
        //         data = {
        //             reason: error && error.error.message ? error.error.message : '',
        //             status: error.status
        //         };
        //         this.errorDialogService.openDialog(data);
        //         return throwError(error);
        //     }));

        // return next.handle(httpRequest).pipe(
        //     map((event: HttpEvent<any>) => {
        //         if( event instanceof HttpResponse ){
        //             console.log('event--->>>' + event);
        //         }
        //         return event;
        //     })
        // );

//     }
// }

import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler,HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import { catchError, filter, take, switchMap, finalize } from "rxjs/operators";

@Injectable()
export class RepublicInterceptor implements HttpInterceptor {
    private AUTH_HEADER = "Authorization";
    private token = localStorage.getItem("token");
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
        const token: any = localStorage.getItem('token');
        if( token ){
            req = req.clone( { headers: req.headers.set('Authorization', 'Bearer ' + token ) });
        }
        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }

        req = this.addAuthenticationToken(req); 
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
            if (error && error.status === 401) {
                // 401 errors are most likely going to be because we have an expired token that we need to refresh.
                    if (this.refreshTokenInProgress) {
                    // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                    // which means the new token is ready and we can retry the request again
                    return this.refreshTokenSubject.pipe(
                        filter(result => result !== null),
                        take(1),
                        switchMap(() => next.handle(this.addAuthenticationToken(req)))
                    );
                    } else {
                    this.refreshTokenInProgress = true;

                    // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                    this.refreshTokenSubject.next(null);
                    
                    return this.refreshAccessToken().pipe(
                        switchMap((success: boolean) => {               
                        this.refreshTokenSubject.next(success);
                        return next.handle(this.addAuthenticationToken(req));
                        }),
                    // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                    // for the next time the token needs to be refreshed
                        finalize(() => this.refreshTokenInProgress = false)
                    );
                    }
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private refreshAccessToken(): Observable<any> {
        return of("secret token");
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        // if (!this.token) {
        //     return request;
        // }
        // If you are calling an outside domain then do not add the token.
        if (!request.url.match(/https:\/\/aws-dev-01.isg.us\//)) {
            return request;
        }
        return request.clone({
            headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token)
        });
    }
}

