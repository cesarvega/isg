import { Component, OnInit } from '@angular/core';
import { states } from '@nx/earthlink/utilities';

import { Validators, FormGroup, FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

//import { SYSTEM_CONFIG } from '@nx/earthlink/config';
import { ENDPOINT } from '@nx/earthlink/api';
import { ApiService } from '@nx/earthlink/shared';
import { AddressService } from '../../services/address.service';


@Component({
  selector: 'nx-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  uuid: any='';
  headers = new HttpHeaders;
  addressState = {
    error: null,
    loading: false,
  }

  formdata: any;
  states = states;
  token: any;

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

  submitted = false;
  invalid = false;
  objErrors:any=null;

  constructor(
    
    private http: HttpClient,
    private router: Router,
    //private apiService: ApiService,
    private addressService: AddressService,
    //private store: Store<any>
    ) {
      this.token = localStorage.getItem('token');
      if( this.token == null ){
        this.router.navigate([ENDPOINT.login.navigate]);
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
    })
  }
  
  // keys() : Array<string>{
  //     return Object.keys(Array.of(this.objErrors));
  // }

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

    if( this.formdata.valid ) {
      this.invalid = false;
      this.submitted = true;
      // To do : shows up a spinner

      const data = this.formdata.value;
      await this.addressService.serviceQualification( data, this.headers );
      if( !this.addressState.error ){
        this.router.navigate([ENDPOINT.offers.navigate]);
      }
    }
  }

  ngOnInit(): void {

    if( localStorage.getItem('uuid') ){
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
        'Accept': 'application/json'
      });


      this.uuid = new FormControl( localStorage.getItem('uuid') );
      this.formdata = new FormGroup({
        uuid: this.uuid,
      });

      console.log( this.formdata.value );
      this.addressService.getAddress( this.formdata.value, this.headers);
    }
    this.createFormControls();
    this.createForm();
  }
}