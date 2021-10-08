import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl  } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

/**********************************************************/

import { states } from '@nx/earthlink/utilities';
import { getEarthlinkAddressState } from '../../+state/address/earthlink-address.selectors';
import { AddressService } from '../../services/address.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { testCases } from './test-cases';
import { Address } from './interfaces/address';
import { setParams, addressRequest, addressResponse } from '../../+state/address/earthlink-address.actions';
import { buildAddressFromParams } from './helpers/buildAddressFromParams';
import { AddressSelectors } from '@nx/earthlink/address';
@Component({
  selector: 'nx-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {
address$ = this.store.select(AddressSelectors.getAllEarthlinkAddress)

headers = new HttpHeaders;
token: any;
invalid: boolean = false;
objErrors: any = [];
formdata!: any;
states: any=states;
submitted: boolean=false;

faStar = faStar
testCases = testCases;
addressState = {
  error: null,
  loading: false,
  customerType: "NEW"
};
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





  constructor(
    private addressService: AddressService,
    private store: Store<any>, 
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.token = localStorage.getItem('token');
    if( this.token == null ){
      //this.router.navigate([ENDPOINT.login.navigate]);
    }
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
        Validators.pattern("[0-9]{10}")
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
    })
  }

  ngOnInit(): void {
    let params;
    this.route.queryParams.subscribe((queryParams) => {
      params = queryParams;
    })
    this.store.dispatch(setParams({ params }))
    debugger;
    this.initialData = buildAddressFromParams(this.address$);

    this.createFormControls();
    this.createForm();
  }
  
  isExistingCustomer() {
    return this.addressState.customerType === "SLI";
  }

  handleError( result:any )
  {
    //this.objErrors = Object.entries( result.error.errors );
    const arr:any = Object.keys(result).map(function(k) { return result[k] });
    console.log( arr );
    this.objErrors = Array.of(arr);

  }

  async onSubmit(){
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });

    const address = this.formdata.value;
    this.submittedAddress = address;
    await this.addressService.generateTransaction(this.headers);
    await this.addressService.serviceQualification(address, this.headers);
    if (this.isExistingCustomer()) {
      //return
    }
    if (!this.addressState.error) {
      this.store.dispatch(addressResponse(address));
      this.router.navigate(["/offers"]);
    }
  }
}
