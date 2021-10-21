import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { errorPayment } from '../+state/billing/earthlink-billing.actions';
import { getCurrentAccount } from '@nx/earthlink/account';
import { CcTest } from '../services/test-creditcard';
import { states } from '@nx/earthlink/utilities';
import { getAddressState, getOffersState } from '@nx/earthlink/state';
import { takeUntil } from 'rxjs/operators';
import { BillingService } from '../services/billing.services';
declare var paymentTechEncrypt: any;

@Component({
  selector: 'nx-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  stateSubscription: Subscription | undefined;
  account$: any = null;
  
  billingData: any = null;
  autoPayDisclaimer: boolean = false;
  disclaimer: boolean = false;
  address$: any = null;

  productId$: any = null;


  /** Form and controls **/
  formData!: any;
  sendingOrder: any = false;
  agreeTerms: any = false;
  states: any = states;

  isError$ = new Subject<boolean>();
  objErrors:any = null;

  ccIsEncrypted: any = null;


  /** Modal **/
  @ViewChild('clearAddressModal') clearAddressModal : TemplateRef<any> | undefined;
  modalReference: any = null;
  chkClearAddress: any;

  constructor(
    private window: Window,
    private billingService: BillingService,
    private store: Store,
    private router: Router,
    private modalService: NgbModal,
    update$: Actions,
    //private billingService: BillingService,
    //private update$: Actions,
  ) { 
    
    this.stateSubscription = update$.pipe(
      ofType(errorPayment))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.isError$.next(true);
        if( data.hasOwnProperty('error') ){
          this.objErrors.push( data.error.error )
        }else{
          this.objErrors.push( 'An error ocurred');
        }
      })

    this.stateSubscription = this.store.select(getCurrentAccount).subscribe((account) =>{
      if( account ){
        this.account$ = account;
      }else{
        this.router.navigate(['/address']);
      }
    })
    this.stateSubscription.unsubscribe;

    this.stateSubscription = this.store.select(getAddressState).subscribe((address) => {
      if( address && address.response ){
        this.address$ = address.response ;
      }else{
        this.router.navigate(['/address']);
      }
    })
    this.stateSubscription.unsubscribe;

    this.stateSubscription = this.store.select(getOffersState).subscribe((response) => {
      if( response && response.product && response.product.id ){
        this.productId$ = response.product.id ;
      }else{
        this.router.navigate(['/offers']);
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
    this.formData = new FormGroup({
      creditCardNumberInput: new FormControl('', Validators.required),
      expDateMonth: new FormControl('', Validators.required),
      expDateYear: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
      billing_address_line1: new FormControl('', Validators.required),
      billing_address_line2: new FormControl('', Validators.required),
      billing_city: new FormControl('', Validators.required),
      billing_state: new FormControl('', Validators.required),
      billing_zip_code: new FormControl('', Validators.required),
    })
  }


  ngOnInit(): void {
    this.createForm();

    if( !this.account$ ){
      this.router.navigate(['/account']);
    }

    this.chkClearAddress = 1;
  }

  f_agentReadDisclaimer( e: any ){
    if(e.target.checked ){
      this.disclaimer = true;
    }else{
      this.disclaimer = false;
    }
  }

  f_autoPayDisclaimer( e:any ){
    if(e.target.checked ){
      this.autoPayDisclaimer = true;
    }else{
      this.autoPayDisclaimer = false;
    };
  }

  f_agreeTerms( e: any ){
    if(e.target.checked ){
      this.agreeTerms = true;
    }else{
      this.agreeTerms = false;
    };
    
  }

  useCaseCc(){
    this.formData.patchValue(
      {
        creditCardNumberInput: CcTest.number,
        expDateMonth: CcTest.expMonth,
        expDateYear: CcTest.expYear,
        cvv: CcTest.cvv
      }
    )
  }


  encryptCC(cc: any,vv: any){
    this.objErrors = null;
    if (!cc){
      cc = this.formData.get('creditCardNumberInput').value;
    }

    if( !vv ){
      vv = this.formData.get('cvv').value;
    }

    /******************************************************
     *  paymentTechEncrypt is a function at chase.js file
     * chase.js file was added in app/index.html file
     ******************************************************/
    this.ccIsEncrypted = paymentTechEncrypt.card(cc, vv);
    if (this.ccIsEncrypted ){

      /** the field already exists at the form? **/
      if( this.formData.get('creditcardnumber')){
        /** update its value **/
        this.formData.get('creditcardnumber').value = this.ccIsEncrypted;
      }else{

        /** creating and appening the field to the form **/
        this.formData.addControl( 'creditcardnumber', new FormControl(this.ccIsEncrypted, Validators.required));
      }
    }else{
      /****** CC invalid  ******/
      this.objErrors = ['Invalid Credit Card Number and/or CVV'];
      /** if the field already exists, update its value **/
      if(this.formData.get('creditcardnumber')){
        this.formData.get('creditcardnumber').value = null;
      }
    }
  }

  checkSameAddress(e: any){
    this.encryptCC( this.formData.get('creditCardNumberInput').value, this.formData.get('cvv').value );
    if( e.target.checked ){
      this.formData.patchValue(
        { 
          billing_address_line1: this.address$.address_line1,
          billing_address_line2: this.address$.address_line2,
          billing_city: this.address$.city,
          billing_state: this.address$.state,
          billing_zip_code: this.address$.zip_code,
          
        }
      );
      
      this.formData.get('billing_address_line1').disable();
      this.formData.get('billing_address_line2').disable();
      this.formData.get('billing_city').disable();
      this.formData.get('billing_state').disable();
      this.formData.get('billing_zip_code').disable();

    }else{
      this.showModal();
    }
  }

  clearAddressSwitch( e:any ){
    this.chkClearAddress = e.target.value;
  }

  clearAddressFunction(){
    if( this.chkClearAddress == 1 ){
      this.formData.patchValue({
        billing_address_line1: '',
        billing_address_line2: '',
        billing_city: '',
        billing_state: '',
        billing_zip_code: ''
      })
    }

    this.formData.get('billing_address_line1').enable();
    this.formData.get('billing_address_line2').enable();
    this.formData.get('billing_city').enable();
    this.formData.get('billing_state').enable();
    this.formData.get('billing_zip_code').enable();
    
    this.modalReference.close();
  }

  closeModal(){
    this.chkClearAddress = !this.chkClearAddress;
    this.modalReference.close();
  }

  showModal(){
    this.modalReference = this.modalService.open( this.clearAddressModal, { size: 'sm', backdrop: 'static' } );
  }

  async submitOrder(){
    /*** Disabling input boxes wont be send ***/
    this.formData.get('creditCardNumberInput').disable();

    /** Adding disclaimer fields **/
    this.formData.addControl( 'AgentReadTC', new FormControl('Yes'));
    this.formData.addControl( 'CustomerAcceptedTC', new FormControl('Yes'));
    this.formData.addControl( 'TC_source', new FormControl('Infinity-CallCenter'));
    
    /** Service Address **/
    this.formData.addControl( 'address1', new FormControl(this.address$.address_line1));
    // TODO ???'address_line2', new FormControl(this.address$.address_line2));
    this.formData.addControl( 'city', new FormControl(this.address$.city));
    this.formData.addControl( 'state', new FormControl(this.address$.state));
    this.formData.addControl( 'zip_code', new FormControl(this.address$.zip_code));    

    /** Billing Address **/
    /************************
     *  fields sent 
     * *********************/
    //billing_address_line1
    //billing_address_line2 like unit
    //billing_city
    //billing_state
    //billing_zip_code


    /** Registration Info **/
    this.formData.addControl( 'firstname', new FormControl(this.address$.first_name));
    this.formData.addControl( 'lastname', new FormControl(this.address$.last_name));
    this.formData.addControl( 'email', new FormControl(this.address$.email));
    this.formData.addControl( 'phone', new FormControl(this.address$.first_name));
    this.formData.addControl( 'alt_phone', new FormControl(this.address$.day_phone));
    this.formData.addControl( 'password', new FormControl(this.account$.password));

    /** SERVICE REFERENCE **/
    this.formData.addControl( 'service_reference', new FormControl(this.productId$));

    await this.billingService.makeApayment(this.formData.value);
  }
}
