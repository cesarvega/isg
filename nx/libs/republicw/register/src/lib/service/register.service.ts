import { Injectable } from "@angular/core";
import { tap, map, catchError } from 'rxjs/operators';

import { ApiService } from '@nx/republicw/services';
import { CustomHeaders } from '@nx/earthlink/shared';
import { SYSTEM_CONFIG } from '@nx/republicw/config';
import { of } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class NewRegister {
    data: any = {};
    err: any = null;
    constructor(
        private apiService: ApiService,
        private customHeaders: CustomHeaders,
    ){ }

    register( body: any ){
        const header = this.customHeaders.bearer( localStorage.getItem('token'));
        
       return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.REGISTER_PATH, body, header ).pipe(
            catchError( err => this.err = of( 'There was an error'))
        ).subscribe( data => this.data = data );
    }
}