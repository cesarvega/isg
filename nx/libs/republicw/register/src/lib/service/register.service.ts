import { Injectable } from "@angular/core";
import { tap, map } from 'rxjs/operators';

import { ApiService } from '@nx/republicw/services';
import { CustomHeaders } from '@nx/earthlink/shared';
import { SYSTEM_CONFIG } from '@nx/republicw/config';
@Injectable({
    providedIn: 'root'
})
export class NewRegister {

    constructor(
        private apiService: ApiService,
        private customHeaders: CustomHeaders,
    ){ }

    register( body: any ){
        const header = this.customHeaders.bearer( localStorage.getItem('token'));

        return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.REGISTER_PATH, body, header ).pipe(
            map((response: any) =>{
                if( response && response.data && response.data.id ){
                    return response.data.id;
                }else{
                    return 'Register failed.';
                }
            }),
            tap((request: any) =>{

            },(error) => {
                return error;
            })
        ).toPromise();

    }
}