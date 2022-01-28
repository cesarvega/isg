import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from './token-services/token-storage-service';
import { AuthService } from './token-services/auth-service';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from 'apps/isgcrm/src/environments/environment';


@Injectable()
export class IsgcrmInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenService: TokenStorageService, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        let authReq = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            authReq = this.addTokenHeader(req, token);
        }

        return next.handle(authReq).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(authReq, next);
            }

            return throwError(error);
        }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.requestToken().pipe(
                switchMap((response: any) => {
                    this.isRefreshing = false;

                    this.tokenService.saveToken(response.token);
                    this.refreshTokenSubject.next(response.token);
                    
                    return next.handle(this.addTokenHeader(request, response.token));
                }),
                catchError((err) => {
                    this.isRefreshing = false;
                    
                    this.tokenService.signOut();
                    return throwError(err);
                })
            );
        }

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        /**********************************************************************
         * If we are calling to an external domain, then do not add the header
         */
        const url = environment.apiUrl;
        if( !request.url.match(url) ) return request;
        /**********************************************************************/
        
        return request.clone({ headers: request.headers.set(environment.token_header_key, 'Bearer ' + token) });
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: IsgcrmInterceptor, multi: true }
];