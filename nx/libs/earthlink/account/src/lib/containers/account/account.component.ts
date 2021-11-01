import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { faBars, faExclamationCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
  faExclamationCircle = faExclamationCircle;

  errors: any = null;
  stateSubscription: Subscription | undefined;
  product$: any = null;
  address$: any = null;
  account$: any = null;
  error$: any = null;
  isError$ = new Subject<boolean>();

/***** Form elements ********/
formdata!: any;
token: any = null;
faArrowRight = faArrowRight;


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

  createForm(){
    this.formdata = new FormGroup({
      first_name: new FormControl ('', Validators.required),
      last_name: new FormControl('', Validators.required),
      user_name: new FormControl('', Validators.required),
      password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/)
        ]
      )
    })
  }



  ngOnInit(): void {
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
          }
        )
        
      }else if( this.address$ ){
        this.formdata.setValue(
          {
            first_name: '',
            last_name: '',
            user_name: '',
            password: '',
          }
        )
      }
    
    }
  }

  async onSubmit(){
    if( this.formdata.invalid )return;

    this.formdata.addControl( 'day_phone', new FormControl( this.address$.phone ));
    this.formdata.addControl( 'home_phone', new FormControl( this.address$.alt_phone ));
    this.formdata.addControl( 'email', new FormControl( this.address$.email ));
    
    const account = this.formdata.value;
    await this.accountService.createAccount(account );
  }

  chooseSuggestion(e: string){
    this.formdata.patchValue(
      { 
        user_name: e
      })
    this.onSubmit();
  }
}
