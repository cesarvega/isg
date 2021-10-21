import { Injectable } from "@angular/core";
import { ApiService } from "@nx/earthlink/shared";
import { addAccount } from './endpoints';
import { tap, map } from 'rxjs/operators';
import { createAccount, createAccountFailure } from "../../lib/+state/account/earthlink-account.actions";
import { Store } from "@ngrx/store";
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(
        private apiService: ApiService,
        private store: Store,
        private router: Router,

    ){ }



    createAccount( account: any, headers: any ){
        return this.apiService.post( addAccount, account, headers).pipe(
            tap((response: any) => {
                if( response && response.id ){

                    //Append the password to store, because the server response wont include it (protected)
                    Object.assign( response, { "password": account.password })

                    this.store.dispatch( createAccount( { account: response } ))
                    this.router.navigate(['/billing']);
                }else{
                    if( response.error )
                    this.store.dispatch( createAccountFailure( response.error ))
                }
            }
            ,(response) => {
                this.store.dispatch( createAccountFailure(response.error) )
            })
        ).toPromise();
    }
}