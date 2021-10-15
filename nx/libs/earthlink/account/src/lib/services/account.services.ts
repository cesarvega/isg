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
                    this.store.dispatch( createAccount( { account: response } ))
                    this.router.navigate(['/billing']);
                    //return response;
                }else{
                    this.store.dispatch( createAccountFailure( { error: 'Cannot create the account' } ))
                }
            }
            ,(error) => {
                this.store.dispatch( createAccountFailure(error))
            })
        ).toPromise();
    }
}