import { Injectable } from "@angular/core";
import { ApiService } from "@nx/earthlink/shared";
import { SYSTEM_CONFIG } from '@nx/earthlink/config';
import { tap, map } from 'rxjs/operators';
import { createAccount, createAccountFailure } from "../../lib/+state/account/earthlink-account.actions";
import { Store } from "@ngrx/store";
import { Router } from '@angular/router';
import { CustomHeaders } from "@nx/earthlink/shared";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    headers: any = null;
    token: any = null;

    constructor(
        private apiService: ApiService,
        private store: Store,
        private router: Router,
        private customheaders: CustomHeaders,
    ){
        this.token = localStorage.getItem('token'),
        this.headers = this.customheaders.bearer( this.token );
     }



    createAccount( account: any ){
        return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.account, account, this.headers).pipe(
            tap((response: any) => {
                if( response && response.id ){

                    //Append the password and user_name to store, because the server response wont include it (are protected)
                    Object.assign( response, { "password": account.password })
                Object.assign( response, { "user_name" : account.user_name })

                    this.store.dispatch( createAccount( { account: response } ))
                    this.router.navigate(['/billing']);
                }else{
                    if( response.error )
                    this.store.dispatch( createAccountFailure( response.error ))
                }
            }
            ,(response) => {
                this.store.dispatch( createAccountFailure( response.error ) )
            })
        ).toPromise();
    }
}