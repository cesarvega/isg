import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { NewOrderService } from '@nx/republicw/new-order';

@Component({
  selector: 'nx-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  
  formData!: any;
  id: any = null;

  byod: any = null;
  lines: any = null;
  plans: any = null;

  selectedPlanId: any = null;
  selectedLines: any = null;
  selectedLineId: any = 0;
  newOrderForm!: any;

  items: any = [];
  
  constructor(
    private newOrderService: NewOrderService,
    private fb: FormBuilder,

  ) { }
    

  ngOnInit(): void {
    this.createForm();
    this.getLinesQuantity();
    this.getByod();
  }

  async getLinesQuantity(){
    this.lines = await this.newOrderService.getLinesQuantity();
    
    if( this.lines ){
      //Adding to LINES dropdown element, the <SELECT> option
      const line0 = {
        id: 0,
        description: 'Select',
        value: 999
      };
      this.lines.unshift( line0 );
    }
  }

  async getPlans( q: string ){
    /* Pulling plans from server.
    *  new-order.services.ts send to api.service.ts a Bearer token, using  CustomHeaders from '@nx/earthlink/shared';
    *  and the body, using body.request.ts
    */
    this.plans = await this.newOrderService.getPlans(q);
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


  async customerRequest(){
    const customer = await this.newOrderService.getCustomer('99988877766');
    if( customer ){
      this.formData.patchValue({
        first_name: customer.first_name ,
        last_name: customer.last_name,
        phone_number: customer.phone_number,
        order_number: customer.order_number
      })
      this.id = customer.id;
      //this.formData = null;
    }
  }

  createForm(){
    this.formData = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      phone_number: new FormControl(''),
      order_number: new FormControl(''),
      plan: new FormControl(''),
      lines: new FormControl(''),
      call_key: new FormControl(''),
      items: new FormArray([])
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


  linesChangeHandler( event: any ){
    this.selectedLines = null;
    this.selectedPlanId = 0;
    this.selectedLineId = parseInt( event.value );

    const items = this.formData.get('items');
    if( items ){
      const q = items.length;
      for(var k=0; k<q; k++){
        this.quantities().removeAt(k);
      }
    }

    if( this.selectedLineId !== 0 ){
      this.getPlans( this.selectedLineId );
    }
  }

  planChangeHandler( event: any ){
    if( event.value === 0 ){
      this.selectedLineId = 0;
      this.selectedLines = null;
      return;
    }
    this.selectedPlanId = event.value;
    const arr = this.lines.filter( (x:any) => x.value <= this.selectedLineId );
    this.selectedLines = arr;
  }

  deviceTypeSelected( event: any ){
    this.quantities().push (this.newQuantity( event.value ) );
  }

  newQuantity( id: any ): FormGroup {
    return this.fb.group({
      id: id,
      description: '',
      name: '',
      product_category_id: 2,
    })
  }

  quantities(): FormArray {
    return this.formData.get("items") as FormArray;
  }


  async onSubmit(){
    const lines = this.formData.get('lines').value;
    const plan = this.formData.get('plan').value;
    const items = this.formData.get('items').value;
    console.log( this.formData.value );
    return;

    this.formData.addControl('customer_id', new FormControl( this.id ) );
    const call_key =  this.formData.get('call_key').value;
    const order_number = this.formData.get('order_number').value;
    const customer_id = this.formData.get('customer_id').value;
    const data = [
      { 
        "call_key":call_key.toString(),
        "order_number": order_number.toString(),
        "customer_id": customer_id.toString(),
        "items": items
      }
    ];

    console.log( data );
    //await this.newOrderService.putNewOrder( data );
  }
}
