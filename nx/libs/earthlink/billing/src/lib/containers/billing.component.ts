import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillingService } from '../services/billing.services';
import { getCurrentAccount } from '@nx/earthlink/account';
import { CcTest } from '../services/test-creditcard';
import { states } from '@nx/earthlink/utilities';
import { getAddressState } from '@nx/earthlink/state';

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


  /** Modal **/
  @ViewChild('clearAddressModal') clearAddressModal : TemplateRef<any> | undefined;
  modalReference: any = null;
  chkClearAddress: any;

  constructor(
    private store: Store,
    private router: Router,
    private modalService: NgbModal,
    //private billingService: BillingService,
    //private update$: Actions,
  ) { 

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

  createForm(){
    this.formData = new FormGroup({
      creditCardNumber: new FormControl('', Validators.required),
      expDateMonth: new FormControl('', Validators.required),
      expDateYear: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
      billingAddressLine1: new FormControl('', Validators.required),
      billingAddressLine2: new FormControl('', Validators.required),
      billingCity: new FormControl('', Validators.required),
      billingState: new FormControl('', Validators.required),
      billingZipCode: new FormControl('', Validators.required),
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
          billingAddressLine1: this.address$.address_line1,
          billingAddressLine2: this.address$.address_line2,
          billingCity: this.address$.city,
          billingState: this.address$.state,
          billingZipCode: this.address$.zip_code,
          
        }
      );
      
      this.formData.get('billingAddressLine1').disable();
      this.formData.get('billingAddressLine2').disable();
      this.formData.get('billingCity').disable();
      this.formData.get('billingState').disable();
      this.formData.get('billingZipCode').disable();

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
        billingAddressLine1: '',
        billingAddressLine2: '',
        billingCity: '',
        billingState: '',
        billingZipCode: ''
      })
    }

    this.formData.get('billingAddressLine1').enable();
    this.formData.get('billingAddressLine2').enable();
    this.formData.get('billingCity').enable();
    this.formData.get('billingState').enable();
    this.formData.get('billingZipCode').enable();
    
    this.modalReference.close();
  }

  closeModal(){
    this.chkClearAddress = !this.chkClearAddress;
    this.modalReference.close();
  }

  showModal(){
    this.modalReference = this.modalService.open( this.clearAddressModal, { size: 'sm', backdrop: 'static' } );
  }

  submitOrder(){
    alert('submitted')
  }
}
