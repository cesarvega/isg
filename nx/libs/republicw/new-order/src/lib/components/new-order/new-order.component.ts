import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { states } from '@nx/earthlink/utilities';

@Component({
  selector: 'nx-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  
  formData!: any;
  byod: any = [
    { id: 'Select', value: null },
    { id: 'BYOD', value: 'byod' },
    { id: 'New Device', value: 'new' }
  ];

  states: any = states;
  lines: any = [
    {
      id: 100,
      description: 'One Line',
      quantity: 1
    },
    {
      id: 200,
      description: 'Two Lines',
      quantity: 2
    }    
  ];

  plans: any = [
    {
        "id": 12,
        "name": "20 for one line",
        "description": "Only What You Need - $20 FOR ONE LINE",
        "slug": "sp201l",
        "price": 20,
        "product_category_id": 1,
        "created_at": "2021-11-19T17:19:28.000000Z",
        "updated_at": "2021-11-19T17:19:28.000000Z"
    },
    {
        "id": 13,
        "name": "40 for one line",
        "description": "Everything You Want - $40 FOR ONE LINE",
        "slug": "sp401l",
        "price": 40,
        "product_category_id": 1,
        "created_at": "2021-11-19T17:19:28.000000Z",
        "updated_at": "2021-11-19T17:19:28.000000Z"
    },
    {
        "id": 14,
        "name": "60 for one line",
        "description": "Everywhere You Go - $60 FOR ONE LINE",
        "slug": "sp601l",
        "price": 60,
        "product_category_id": 1,
        "created_at": "2021-11-19T17:19:28.000000Z",
        "updated_at": "2021-11-19T17:19:28.000000Z"
    },
    {
        "id": 15,
        "name": "30 for two lines",
        "description": "Only What You Need - $30 FOR TWO LINES",
        "slug": "sp302l",
        "price": 30,
        "product_category_id": 1,
        "created_at": "2021-11-19T17:19:29.000000Z",
        "updated_at": "2021-11-19T17:19:29.000000Z"
    },
    {
        "id": 16,
        "name": "60 for two lines",
        "description": "Everything You Want - $60 FOR TWO LINES",
        "slug": "sp602l",
        "price": 60,
        "product_category_id": 1,
        "created_at": "2021-11-19T17:19:29.000000Z",
        "updated_at": "2021-11-19T17:19:29.000000Z"
    },
    {
        "id": 17,
        "name": "90 for two lines",
        "description": "Everywhere You Go - $90 FOR TWO LINES",
        "slug": "sp902l",
        "price": 90,
        "product_category_id": 1,
        "created_at": "2021-11-19T17:19:29.000000Z",
        "updated_at": "2021-11-19T17:19:29.000000Z"
    }
  ];
  selectedLines: any = null;
  selectedLineId: any = 0;
  newOrderForm!: any;

  constructor() { }

  ngOnInit(): void {
    this.createForm();
    const line0 = {
      id: 0,
      description: 'Select',
      quantity: 999
    };
    this.lines.unshift( line0 );

    const plan0 = {
      "id": null,
      "description": "Select"
    }
    this.plans.unshift(plan0);

  }

  createForm(){
    this.formData = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      phone_number: new FormControl(''),
      email: new FormControl(''),
      order_number: new FormControl(''),
      plan: new FormControl(''),
      lines: new FormControl(''),

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
            this.newOrderForm.patchValue({
                zip_code: component.long_name
            })
            break;

          case 'locality':
            this.newOrderForm.patchValue({
                city: component.long_name
            });
            break;

          case 'administrative_area_level_1':
            this.newOrderForm.patchValue(
              {
                state: component.short_name
              }
            );
            break;
        }

        const addressLine1 = `${streetNumber} ${streetName}`;
        this.newOrderForm.patchValue(
          {
            address_line1: addressLine1
          }
        )        
      }
    }
  }

  linesChangeHandler( event: any ){
    this.selectedLines = null;
    this.selectedLineId = event.value;
    const arr = this.lines.filter( (x:any) => x.quantity <= event.value );
    this.selectedLines = arr;

  }

  planChangeHandler( event: any ){
    if( event.value == null ){
      this.selectedLineId = 0;
      this.selectedLines = null;
    }
  }

}
