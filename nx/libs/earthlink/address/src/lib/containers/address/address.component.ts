import { Component, OnInit } from '@angular/core';
import { states } from '@nx/earthlink/utilities';

import { Validators, FormGroup, FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { SYSTEM_CONFIG } from '@nx/earthlink/config';
import { ENDPOINT } from '@nx/earthlink/api';


@Component({
  selector: 'nx-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  formdata: any;
  states = states;
  //testAddress = testAddress;
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
    
    ) {}

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
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      isBusiness: this.isBusiness,
      inputFirstName: this.inputFirstName,
      inputLastName: this.inputLastName,
      inputEmail: this.inputEmail,
      inputPhone: this.inputPhone,
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


  onSubmit(){
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjQyMTg5MSwiZXhwIjoxNjMyNDI1NDkxLCJuYmYiOjE2MzI0MjE4OTEsImp0aSI6IlhwOVVJa01RQkM3cW5ZSW4iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.4vOLBNAcRwR7GZHw0dyRMSh_biXOx_1aNJ_kYkS8aSI',
      'Accept': 'application/json'
    });
    let options = { headers: headers };

    if( this.formdata.valid ) {
      this.invalid = false;
      //this.submitted = true;

      // this.formdata.patchValue({
      //   api_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjQyMTg5MSwiZXhwIjoxNjMyNDI1NDkxLCJuYmYiOjE2MzI0MjE4OTEsImp0aSI6IlhwOVVJa01RQkM3cW5ZSW4iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.4vOLBNAcRwR7GZHw0dyRMSh_biXOx_1aNJ_kYkS8aSI'
      // })

    const request = this.formdata.value;
      
      this.http.post(SYSTEM_CONFIG.API_URL + ENDPOINT.address.path, request, options).subscribe(
        () => this.router.navigate([ENDPOINT.offers.navigate]),
        (error) => this.handleError( error )
      )
    }else {
      console.log('invalid form');
      this.invalid = true;
    }
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }
}