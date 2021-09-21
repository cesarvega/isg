import { Component, OnInit } from '@angular/core';
import { states } from '@nx/earthlink/utilities';
import { testAddress } from './address';

import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'nx-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json, text/plain, */*'
  });

  options = { headers: this.headers };
  
  formdata:any;
  states = states;
  testAddress = testAddress;
  
  submitted = false;
  invalid = false;


  constructor( 
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.myForm()
  }

  myForm(){
    this.formdata = this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['',
        [
          Validators.required,
          //Validators.pattern("[a-z]{2}")
        ]
      ],
      zipCode: ['',
        [
          Validators.required,
          Validators.pattern("[0-9]{5}")
        ]
      ],
      isBusiness: [''],
      inputFirstName: ['', Validators.required ],
      inputLastName: ['', Validators.required],
      inputEmail: ['',
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      inputPhone: ['',
        [
          Validators.required,
          Validators.pattern("[0-9]{10}")
        ],
       ],
    })
  }

  onSubmit(){
    if( this.formdata.valid ) {
      this.invalid = false;
      //this.submitted = true;
//https://isg-br-webdev/wc/carlos/infinity-sales/app/web/index.php/EarthLink/entry/pre-qual-address
      this.http.post('https://isg-br-webdev/wc/carlos/infinity-sales/app/web/index.php/EarthLink/entry/pre-qual-address', this.testAddress, this.options).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    }else {
      console.log('invalid');
      this.invalid = true;
    }
  }

  ngOnInit(): void {
  }

}
