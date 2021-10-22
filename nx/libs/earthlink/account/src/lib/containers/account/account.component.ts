import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription } from 'rxjs';
import { getCurrentProduct } from '@nx/earthlink/offers';
import { getAddressState, getAccountFailure } from '@nx/earthlink/state';
import { validatePhoneNumber } from '@nx/earthlink/shared';
import { AccountService } from '../../services/account.services';
import { getCurrentAccount } from '../../+state/account/earthlink-account.selectors';
import { createAccountFailure } from '../../+state/account/earthlink-account.actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nx-account', 
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  /*** ICONS ****/
  faBars = faBars;

  errors: any = null;
  stateSubscription: Subscription | undefined;
  product$: any = null;
  address$: any = null;
  account$: any = null;
  error$: any = null;
  isError$ = new Subject<boolean>();

/***** Form elements ********/
formdata!: any;
first_name: any = null;
last_name: any = null;
user_name: any = null;
password: any = null;
day_phone: any = null;
home_phone: any = null;
token: any = null;



  constructor(
    private store: Store<any>,
    private router: Router,
    private accountService: AccountService,
    private update$: Actions,
  ) { 
    this.token = localStorage.getItem('token');
    this.stateSubscription = this.store.select(getCurrentProduct).subscribe((product) => {
      if( product ){
        this.product$ = product;
      }
    })
    this.stateSubscription.unsubscribe;

    this.stateSubscription = update$.pipe(
      ofType(createAccountFailure))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.isError$.next(true);
        this.error$ = data;
      })
    this.stateSubscription.unsubscribe;
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(){

  }

  createFormControls(){
    this.first_name = new FormControl ('', Validators.required);
    this.last_name = new FormControl('', Validators.required);
    this.user_name = new FormControl('', Validators.required);

    this.password = new FormControl ('',
      [
        Validators.required,
        //Validators.pattern("[a-z]{2}")
      ]
    );

    this.day_phone = new FormControl ('',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        validatePhoneNumber
      ],
    );
    this.home_phone = new FormControl('', validatePhoneNumber );

  }

  createForm(){
    this.formdata = new FormGroup({
      first_name: this.first_name,
      last_name: this.last_name,
      user_name: this.user_name,
      password: this.password,
      day_phone: this.day_phone,
      home_phone: this.home_phone,
    })
  }



  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    if( !this.product$ ){
      this.router.navigate(['/offers']);
    }else{
      /********** Pulling the address from the store ********************/
      /*
        To populate phone and Email input boxes
      */
      this.stateSubscription = this.store.select(getAddressState).subscribe((state) => {
        if( state && state.response )
          this.address$ = state.response;
      })
      this.stateSubscription.unsubscribe();

      /*********** Pulling the current Account (if any)****************/
      /*
        To populate the Account form
      */
      this.stateSubscription = this.store.select(getCurrentAccount).subscribe((state) => {
        if( state && state.id )
          this.account$ = state;
      })
      this.stateSubscription.unsubscribe();

      if( this.account$ ){
        this.formdata.setValue(
          {
            first_name: this.account$.first_name,
            last_name: this.account$.last_name,
            user_name: this.account$.user_name,
            password: '****************',
            day_phone: this.address$.phone,
            home_phone: this.address$.alt_phone,
          }
        )
        
        /** Disabling input boxes **/
        this.first_name.disable();
        this.last_name.disable();
        this.user_name.disable();
        this.day_phone.disable();
        this.home_phone.disable();  
      }else if( this.address$ ){
        this.formdata.setValue(
          {
            first_name: '',
            last_name: '',
            user_name: '',
            password: '',
            day_phone: this.address$.phone,
            home_phone: this.address$.alt_phone
          }
        )
        //this.day_phone.disable();
        //this.home_phone.disable();
      }
    
    }
  }

  async onSubmit(){
    const account = this.formdata.value;
    await this.accountService.createAccount(account );
  }

  chooseSuggestion(e: string){
    this.formdata.patchValue(
      { 
        user_name: e
      })
  }
}
