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
import { getAddressState } from '@nx/earthlink/state';
import { takeUntil } from 'rxjs/operators';
import { BillingService } from '../services/billing.services';

@Component({
  selector: 'nx-containers',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  stateSubscription: Subscription | undefined;
  account$: any = null;
  error$: any = null;
  billingData: any = null;
  autoPayDisclaimer: boolean = false;
  address$: any = null;

  /** Form and controls **/
  formData!: any;
  sendingOrder: any = false;
  agreeTerms: any = false;
  states: any = states;

  isError$ = new Subject<boolean>();
  objErrors:any = [];



  /** Modal **/
  @ViewChild('clearAddressModal') clearAddressModal : TemplateRef<any> | undefined;
  modalReference: any = null;
  chkClearAddress: any;

  constructor(
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
  }


  destroy$ = new Subject<boolean>();
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }


  createForm(){
    this.formData = new FormGroup({
      creditCardNumber: new FormControl('', Validators.required),
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
        creditCardNumber: CcTest.number,
        expDateMonth: CcTest.expMonth,
        expDateYear: CcTest.expYear,
        cvv: CcTest.cvv
      }
    )
  }


  checkSameAddress(e: any){
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
    this.formData.addControl( 'address_line1', new FormControl(this.address$.address_line1));
    this.formData.addControl( 'address_line2', new FormControl(this.address$.address_line2));
    this.formData.addControl( 'city', new FormControl(this.address$.city));
    this.formData.addControl( 'first_name', new FormControl(this.address$.first_name));
    this.formData.addControl( 'last_name', new FormControl(this.address$.last_name));
    this.formData.addControl( 'email', new FormControl(this.address$.email));
    this.formData.addControl( 'phone', new FormControl(this.address$.first_name));
    this.formData.addControl( 'alt_phone', new FormControl(this.address$.alt_phone));

    await this.billingService.makeApayment(this.formData.value);
  }
}
