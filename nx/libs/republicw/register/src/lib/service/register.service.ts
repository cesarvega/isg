import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { ApiService } from '@nx/republicw/services';
import { SYSTEM_CONFIG } from '@nx/republicw/config';
import { of, throwError } from "rxjs";
import { rep_wireless } from "@nx/republicw/services";
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewRegister {
    data: any = {};
    formData!: any;
    err: any = null;
    result$ = new Subject;
    error$ = new Subject;
    constructor(
        private apiService: ApiService,
        private router: Router,
    ){ }

    register( body: any ){
        this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.REGISTER_PATH, body, undefined ).pipe(
            catchError( err => {
                //console.log( 'Handling error and rethrowing it...', err.error.message);
                this.error$.next( {error: err.error.message });
                return throwError(err);
            })
        ).subscribe( 
            (data: any) => {
                //console.log( data );
                this.data = data[0];
                var body = JSON.stringify(rep_wireless);
                body = body.replace(/@firstName/, this.data.first_name);
                body = body.replace(/@lastName/, this.data.last_name);
                body = body.replace(/@lineOne/, this.data.address_one);
                body = body.replace(/@lineTwo/, this.data.address_two);
                body = body.replace(/@city/, this.data.city);
                body = body.replace(/@state/, this.data.state);
                body = body.replace(/@zip/, this.data.zip_code);
                body = body.replace(/@lineOne/, this.data.address_one);
                body = body.replace(/@emailAddress/, this.data.email);
                body = body.replace(/@phone/, this.data.phone_number);

                body = JSON.parse( body );
                this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.DISH_PATH, body, undefined ).pipe(
                    catchError( err => this.err = of( 'Dish\' API error.' ))
                ).subscribe(
                    (data: any ) => {
                        if( data.Url ){
                            window.open( data.Url, "_blank" );
                            this.router.navigate(['/new-order']);
                        }
                    }
                )
            },
            //err => console.log( 'HTTP Error', err),
            //() => console.log('HTTP request completed')
        );
        return this.error$.asObservable();
    }

    requestToken(){
        this.formData = new FormData();
        this.formData = new FormGroup({
            email: new FormControl(SYSTEM_CONFIG.EMAIL),
            password: new FormControl(SYSTEM_CONFIG.PASSWORD)
        });

        const body = this.formData.value;
        this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.TOKEN_PATH, body, undefined).pipe(
            catchError( err => this.err = of( "Authentication error" ))
        ).subscribe(
            (data: any) => {
                localStorage.setItem('token', data.token );
            }
        )

    }
}