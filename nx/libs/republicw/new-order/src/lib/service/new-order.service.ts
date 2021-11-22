import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { ApiService, plans_body, byod_body } from '@nx/republicw/services';
import { SYSTEM_CONFIG } from '@nx/republicw/config';
import { CustomHeaders } from '@nx/earthlink/shared';

@Injectable({
    providedIn: 'root'
})
export class NewOrderService {
    constructor(
        private apiService: ApiService,
        private customHeaders: CustomHeaders,
    ){ }

    getByod(): any{
        const body = byod_body;
        const header = this.customHeaders.bearer(localStorage.getItem('token'));
        return this.apiService.post(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.PRODUCTS_PATH, body, header).pipe(
            map((response: any) => {
                return response.data;
            }),
            tap((request) => {
                return request.data;
            },(error) => {
                return error.message;
            })
        ).toPromise();
    }

    getPlans(): any{
        const body = plans_body;
        const header = this.customHeaders.bearer(localStorage.getItem('token'));
        return this.apiService.post(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.PRODUCTS_PATH, body, header).pipe(
            map( (response: any ) => {
                return response.data;
            }),
            tap((request) => {
                return request.data;
            }, (error) => {
                return error.message;
            })
        ).toPromise();
    }
}