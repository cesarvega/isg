import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { tap, catchError, switchMap, filter, take, map } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from './token-services/token-storage-service';
import { AuthService } from './token-services/auth-service';
import { environment } from 'apps/isgcrm/src/environments/environment';

@Injectable()
export class IsgcrmInterceptor implements HttpInterceptor {
    
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        public toasterService: ToastrService,
        private tokenService: TokenStorageService, 
        private authService: AuthService
    ) {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        let authReq = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            authReq = this.addTokenHeader(req, token);
        }
        return next.handle(authReq).pipe(map((event: any) => {
                //this.toasterService.success("We are back!", "Token refreshed", { positionClass: 'toast-top-center'} );
                return event;
            }), catchError( err => {
                if( err instanceof HttpErrorResponse ){
                    if( err.error.message == "Invalid Credentials."){
                        this.tokenService.signOut();
                    }
                    this.toasterService.error(err.error.message, err.statusText, { positionClass: 'toast-top-center' });
                }

                if( err.status === 401 ) {
                    return this.handle401Error(authReq, next);
                }
                const error = err.error.message || err.statusText;
                return throwError(err);
            })
        );
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
        const customHeaders = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/ld+json',
            'Content-Type': 'application/ld+json'
        });
        return request.clone( { headers: customHeaders } );
        //return request.clone({ headers: request.headers.set(environment.token_header_key, 'Bearer ' + token) });
    }

}