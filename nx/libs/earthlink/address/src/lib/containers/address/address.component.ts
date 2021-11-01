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
import { testCases } from './test-cases';
import { Address } from './interfaces/address';
import { addressRequest, errorAction } from '../../+state/address/earthlink-address.actions';
import { takeUntil } from 'rxjs/operators';
import { validatePhoneNumber } from '@nx/earthlink/shared';
import { faBars, faComment, faArrowRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'nx-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  /** ICONS **/
  faBars = faBars;
  faComment = faComment;
  faArrowRight = faArrowRight;
  
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

uuidStr: any = '';
isError$ = new Subject<boolean>();
objErrors:any = null;

  constructor(
    private addressService: AddressService,
    private store: Store<any>, 
    private router: Router,
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
            this.objErrors = [data.error.error];
          }else{
            this.objErrors = 'An error has ocurred.';
          }
        })
      
      this.stateSubscription.unsubscribe;
    }
  
  destroy$ = new Subject<boolean>();
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }


  createForm(){
    this.formdata = new FormGroup({
      address_line1: new FormControl ('', Validators.required),
      address_line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl ('',
        [
          Validators.required,
          //Validators.pattern("[a-z]{2}")
        ]
      ),
      zip_code: new FormControl ('',
        [
          Validators.required,
          Validators.pattern("[0-9]{5}")
        ]
      ),
      is_business: new FormControl (''),
      first_name: new FormControl ('', Validators.required ),
      last_name: new FormControl ('', Validators.required ),
      email: new FormControl ('', [Validators.required, Validators.email] ),
      phone: new FormControl ('', [
        Validators.required, 
        Validators.pattern("^[0-9]*$")
      ] ),
      alt_phone: new FormControl ('', [
        Validators.pattern("^[0-9]*$")
      ]),
      uuid: new FormControl (''),
      submitted: new FormControl (false),
    })
  }

  ngOnInit(): void {
    /********** Pulling the addres from the store ********************/
    this.stateSubscription = this.store.select(getCurrentAddress).subscribe((address) => {
      this.address$ = address;
    })
    this.stateSubscription.unsubscribe();

    this.createForm();

    /****if the store has an address, populate the form*****/
    if( this.address$){
      this.formdata.patchValue(
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
          alt_phone: this.address$.alt_phone,
          uuid: 'uuid',
        }
      )      
      this.formdata.get('address_line1').disable();
      this.formdata.get('address_line2').disable();
      this.formdata.get('city').disable();
      this.formdata.get('state').disable();
      this.formdata.get('zip_code').disable();
      this.formdata.get('is_business').disable();
      
      /** Flag used to toggle Submit and Continue buttons */
      this.submitted = true;
    }
  }

  handleError( result:any )
  {
    const arr:any = Object.keys(result).map(function(k) { return result[k] });
    console.log( arr );
  }

  async onSubmit(){
    if( this.formdata.invalid )return;
    this.formdata.submitted = true;
    this.formdata.addControl( 'submitted', new FormControl( true ) );
    const address = this.formdata.value;
    this.submittedAddress = address;
    await this.addressService.generateTransaction();
    await this.addressService.serviceQualification(address);

    if (!this.isError$.hasError) {
      this.submitted = true;
      this.router.navigate(["/offers"]);
    }
  }


  continueToOffers(){
    /****
     * If the contact information was modified, update the Address Store data
     */
    if( this.formdata.dirty ){
      this.formdata.get('address_line1').enable();
      this.formdata.get('address_line2').enable();
      this.formdata.get('city').enable();
      this.formdata.get('state').enable();
      this.formdata.get('zip_code').enable();
      this.formdata.get('is_business').enable();
      this.formdata.addControl( 'submitted', new FormControl( true ) );
      let data = this.formdata.value;
      this.store.dispatch(addressRequest({ address: data }));
    }
    this.router.navigate(['/offers']);
  }

}
