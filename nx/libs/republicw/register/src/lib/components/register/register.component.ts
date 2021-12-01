import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { states } from '@nx/earthlink/utilities';
import { NewRegister } from '../../service/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: any;
  states: any = states;
  body: any = undefined;
  result: any = null;
  error$: any = null;

  constructor(
    private newRegister: NewRegister,
    private router: Router,
  ) { 
      this.newRegister.requestToken();
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registerForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address_one: new FormControl('', Validators.required),
      address_two: new FormControl(''),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip_code: new FormControl('', [
          Validators.required,
          Validators.pattern("[0-9]{5}")
        ]
      ),
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
  handleAddressChange( address: any ){
    if( !address || !address.address_components )return;

    var address = address.address_components;
    if( address ){
      for (let component of address) {
        const type = component.types[0];
        switch (type) {
          case 'route':
            var streetName= component.short_name;
            break;

          case 'street_number':
            var streetNumber = component.long_name;
            break;

          case 'postal_code':
            this.registerForm.patchValue({
                zip_code: component.long_name
            })
            break;

          case 'locality':
            this.registerForm.patchValue({
                city: component.long_name
            });
            break;

          case 'administrative_area_level_1':
            this.registerForm.patchValue(
              {
                state: component.short_name
              }
            );
            break;
        }

        const addressLine1 = `${streetNumber} ${streetName}`;
        this.registerForm.patchValue(
          {
            address_one: addressLine1
          }
        )        
      }
    }
  }

  onSubmit(){
    if( this.registerForm.invalid ) return;
    
    const data:any = [this.registerForm.value];
    this.newRegister.register( data ).subscribe(
      //(r:any) => this.result = r.error
      (r: any) => {
        if (r && r.error ){
          if( r.error.match(/duplicate/g) ){
            this.error$ = 'A duplicated data was found: Email or Phone number already exists at the database'
          }else{
              this.error$ = "An error as occured"
          }
        }
      }
    );
  }

  continueToDropOrder(){
    this.router.navigate(['/new-order'])
  }


}
