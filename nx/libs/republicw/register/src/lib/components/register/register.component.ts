import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'nx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: any;

  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registerForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      date: new FormControl(''),
      phone_number: new FormControl(''),
      email: new FormControl(''),
      address_line1: new FormControl(''),
      address_line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip_code: new FormControl(''),
      account_number: new FormControl(''),
    })
  }

  onlyNumbers( input: any ){
    if( input ){
      const text = input.key;
      const transformedInput = text.replace(/[^0-9]/g, '');
      if( text !== transformedInput ){
        return false;
      }
      return text;
    }
  }

}
