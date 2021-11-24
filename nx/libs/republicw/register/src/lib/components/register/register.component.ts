import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { states } from '@nx/earthlink/utilities';
import { NewRegister } from '../../service/register.service';

@Component({
  selector: 'nx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: any;
  states: any = states;
  
  constructor(
    private newRegister: NewRegister,
  ) { }

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
      address_one: new FormControl(''),
      address_two: new FormControl(''),
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

  async onSubmit(){
    const data:any = [this.registerForm.value];
    await this.newRegister.register( data );
  }
}
