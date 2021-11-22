import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NewOrderService } from '@nx/republicw/new-order';
import { tap, map } from 'rxjs/operators';
@Component({
  selector: 'nx-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  
  formData!: any;
  byod: any = null;

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

  plans: any = null;

  selectedPlanId: any = null;
  selectedLines: any = null;
  selectedLineId: any = 0;
  newOrderForm!: any;
  
  constructor(
    private newOrderService: NewOrderService,
  ) { }
    

  ngOnInit(): void {
    this.createForm();
    const line0 = {
      id: 0,
      description: 'Select',
      quantity: 999
    };

    //Adding to LINES dropdown element, the <SELECT> option
    this.lines.unshift( line0 );
    this.getPlans();
    this.getByod();
  }

  async getPlans(){
    /* Pulling plans from server.
    *  new-order.services.ts send to api.service.ts a Bearer token, using  CustomHeaders from '@nx/earthlink/shared';
    *  and the body, using body.request.ts
    */
    this.plans = await this.newOrderService.getPlans();
    if( this.plans ){
      /* Adding to PLANS dropdown element, the <SELECT> option*/
      const plan0 = {
        "id": 0,
        "description": "Select"
      }
      this.plans.unshift(plan0);
    }else{
      if( this.plans.error ){
        alert(this.plans.error.message);
        return;
      }
    }
  }

  async getByod(){
    this.byod = await this.newOrderService.getByod();
    if( this.byod ){
      const byod0 = {
        "id": null,
        "description": "Select"
      }
      this.byod.unshift(byod0);
    }
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
    this.selectedLineId=0;
    //if( event.value === 999 ){
      this.selectedPlanId = 0;
    //  return;
    //}
    this.selectedLineId = event.value;
  }

  planChangeHandler( event: any ){
//    this.selectedPlanId = null;

    if( event.value === 0 ){
      this.selectedLineId = 0;
      this.selectedLines = null;
      return;
    }
    this.selectedPlanId = event.value;
    const arr = this.lines.filter( (x:any) => x.quantity <= this.selectedLineId );
    this.selectedLines = arr;
  }

  async onSubmit(){
    const data = this.formData.value;
    /////await this.newOrderService.TODO( data );
  }
}
