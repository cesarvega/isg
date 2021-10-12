import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl  } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
/**********************************************************/

import { states } from '@nx/earthlink/utilities';
import { getCurrentAddress } from '../../+state/address/earthlink-address.selectors';
import { AddressService } from '../../services/address.service';
//import { faStar } from '@fortawesome/free-solid-svg-icons';
import { testCases } from './test-cases';
import { Address } from './interfaces/address';
import { errorAction, addressResponse } from '../../+state/address/earthlink-address.actions';
//import { buildAddressFromParams } from './helpers/buildAddressFromParams';
import { takeUntil, timestamp } from 'rxjs/operators';
import { validatePhoneNumber } from '@nx/earthlink/shared';
import { productsActionRequest } from '@nx/earthlink/offers';
//import { AddressSelectors } from '@nx/earthlink/address';
@Component({
  selector: 'nx-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {
address$: any = null;
headers = new HttpHeaders;
token: any;
invalid: boolean = false;

formdata!: any;
states: any = states;
submitted: any = false;

//faStar = faStar
testCases = testCases;

stateSubscription: Subscription | undefined;
initialData: Address = {};
submittedAddress: Address = {}

addressLine1: any;
addressLine2: any;
city: any;
state: any;
zipCode: any;
isBusiness: any;
inputFirstName: any;
inputLastName: any;
inputEmail: any;
inputPhone: any;
uuid: any;
uuidStr: any = '';
isError$ = new Subject<boolean>();
objErrors:any = [];

  constructor(
    private addressService: AddressService,
    private store: Store<any>, 
    private router: Router,
    //private route: ActivatedRoute,
    updates$: Actions,
  ) { 
      this.token = localStorage.getItem('token');
      if( this.token == null ){
        this.router.navigate(["/login"]);
      }

      //address.action: errorAction
      this.stateSubscription = updates$.pipe(
        ofType(errorAction))
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.isError$.next(true);
          if(
              data.hasOwnProperty('error')
          ){
            this.objErrors.push( data.error.error.status )
          }else{
            this.objErrors.push( 'The form was not sent. An error has ocurred.');
          }
        })
      
      this.stateSubscription.unsubscribe;
    }
  
  destroy$ = new Subject<boolean>();
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  createFormControls(){
    this.addressLine1 = new FormControl ('', Validators.required);
    this.addressLine2 = new FormControl('');
    this.city = new FormControl('', Validators.required);

    this.state = new FormControl ('',
      [
        Validators.required,
        //Validators.pattern("[a-z]{2}")
      ]
    );

    this.zipCode = new FormControl ('',
      [
        Validators.required,
        Validators.pattern("[0-9]{5}")
      ]
    );

    this.isBusiness = new FormControl ('') ,
    this.inputFirstName = new FormControl ('', Validators.required );
    this.inputLastName  = new FormControl ('', Validators.required);
    
    this.inputEmail = new FormControl ('',
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    );

    this.inputPhone = new FormControl ('',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        validatePhoneNumber
      ],
    );

    this.uuid = new FormControl( this.uuidStr );
  }

  createForm(){
    this.formdata = new FormGroup({
      address_line1: this.addressLine1,
      address_line2: this.addressLine2,
      city: this.city,
      state: this.state,
      zip_code: this.zipCode,
      is_business: this.isBusiness,
      first_name: this.inputFirstName,
      last_name: this.inputLastName,
      email: this.inputEmail,
      phone: this.inputPhone,
      uuid: this.uuid,
      submitted: this.submitted,
    })
  }

  ngOnInit(): void {
    /********** Pulling the addres from the store ********************/
    this.stateSubscription = this.store.select(getCurrentAddress).subscribe((address) => {
      this.address$ = address;
    })
    this.stateSubscription.unsubscribe();

    this.createFormControls();
    this.createForm();

    /****if the store has an address, populate the form*****/
    if( this.address$){
      this.formdata.setValue(
        {
          address_line1 : this.address$.address_line1,
          address_line2 : this.address$.address_line2,
          city : this.address$.city,
          state : this.address$.state,
          zip_code : this.address$.zip_code,
          is_business : this.address$.is_business,
          first_name : this.address$.first_name,
          last_name  : this.address$.last_name,
          email : this.address$.email,
          phone : this.address$.phone,
          uuid: 'uuid'
        }
      )
      this.submitted = this.address$.submitted;
    }
  }

  handleError( result:any )
  {
    const arr:any = Object.keys(result).map(function(k) { return result[k] });
    console.log( arr );
  }

  async onSubmit(){
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });
    this.formdata.addControl( 'submitted', new FormControl( true ) );
    const address = this.formdata.value;
    this.submittedAddress = address;
    //this.store.dispatch(productsActionRequest( { request: null } ));
    await this.addressService.generateTransaction(this.headers);
    await this.addressService.serviceQualification(address, this.headers);

    if (!this.isError$.hasError) {
      this.submitted = true;
      this.router.navigate(["/offers"]);
    }
  }

  ngOnChanges(){
    if( !!this.formdata && this.formdata.dirty ){
    alert('changes');}
  }
}
