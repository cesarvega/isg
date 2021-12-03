import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NewOrderService } from '@nx/republicw/new-order';
import { Router } from '@angular/router';
declare var thisWindow: any;

@Component({
  selector: 'nx-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewOrderComponent implements OnInit {
  
  posted$: boolean = false;
  customLabel: any = [];
  phone_number: any = null;
  result$: any = null;
  message$: any = null;
  dniCallOptions: any = [];
  agentId!: any;
  notFound: boolean = false;
  formSearch!: any;
  formData!: any;
  id: any = null;

  byod: any = null;
  lines: any = null;
  plans: any = null;

  selectedPlanId: any = null;
  selectedLines: any = null;
  selectedLineId: any = 0;
  newOrderForm!: any;
  selectedDeviceArray: any = [];
  items: any = [];
  
  constructor(
    private newOrderService: NewOrderService,
    private fb: FormBuilder,
    private router: Router,
  ) { }
    

  ngOnInit(): void {
    //this.agentId = this.actRoute.snapshot.queryParams["agentId"];
    this.agentId = localStorage.getItem("agentId");
    if(this.agentId ){
        this.getDniCall( this.agentId )
    }
    this.createForm();
    this.getLinesQuantity();
    this.getByod();

    this.phone_number = localStorage.getItem('phone_number');
    this.formSearch = new FormGroup({
      search: new FormControl(this.phone_number, [
        Validators.required,
        Validators.pattern("[0-9]{10}")
      ])
    })
    this.customerRequest();
  }

  async getDniCall( agentId: string ){
    this.dniCallOptions = await this.newOrderService.getDniCall( agentId );
    if( this.dniCallOptions ){
      for( let callOpt of this.dniCallOptions ){

        callOpt.customLabel = `${callOpt.callkey} - [${callOpt.phone}]`;
        this.customLabel.push(callOpt);

      }
    }
  }

  async getLinesQuantity(){
    this.lines = await this.newOrderService.getLinesQuantity();
    
    if( this.lines ){

      //creating form fields for Line Types
      //firstly, get the biggest value to know how many fields must be created
      const q = this.lines.filter( (x: any) => x.value == Math.max( ...this.lines.map( ((x:any) => x.value))));
      for( var k=0; k<q[0].value; k++){
        this.formData.addControl(`byod${k}`, new FormControl(''));
      }

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
        "name": null,
        "description": "Select"
      }
      this.byod.unshift(byod0);
    }
  }


  async customerRequest(){

    var pn = this.formSearch.get('search').value;
    localStorage.setItem('phone_number', pn);
    const customer = await this.newOrderService.getCustomer( pn );

    if( customer ){
      this.notFound = false;
      this.formData.patchValue({
        customer_id: customer.id,
        first_name: customer.first_name ,
        last_name: customer.last_name,
        phone_number: customer.phone_number,
        order_number: customer.order_number
      });

    }else{
      this.notFound = true;
      this.formData.patchValue({
        first_name: '',
        last_name: '',
        phone_number: ''
      })
    }
    //console.log( this.formData.value)
  }

  createForm(){
    this.formData = new FormGroup({
      customer_id: new FormControl(''),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      order_number: new FormControl('', Validators.required),
      plan: new FormControl(''),
      lines: new FormControl(''),
      call_key: new FormControl('', Validators.required),
      items: new FormArray([]),
      byod: new FormControl('', Validators.required)
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

    const arr = <FormArray>this.formData.controls.items;
    arr.controls = [];

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
    if (event.value && this.selectedDeviceArray.indexOf( event.value ) === -1 ){
      console.log( event.value );
    }
    
    //this.quantities().push (this.newQuantity( event ) );
  }

  newQuantity( item: any ): FormGroup {
    return this.fb.group({
      id: item.id,
      description: item.description,
      value: item.value,
    })
  }

  quantities(): FormArray {
    return this.formData.get("items");
  }

  async onSubmit(){

    this.posted$ = false;
    this.formData.get('first_name').enable();
    this.formData.get('last_name').enable();
    this.formData.get('phone_number').enable();

    if( this.formData.invalid )return;

    this.message$ = '';
    this.result$ = '';
    const lines = this.formData.get('lines').value;
    const plan = this.formData.get('plan').value;
    var itemsArr = [];
    var byods = document.getElementsByName('byod');
    if( byods ){
      for( var b=0; b< byods.length; b++ ){
        var e: any = byods[b];
        if( e.options[e.selectedIndex].value ){
          itemsArr.push ( parseInt( e.options[e.selectedIndex].value ) );
        }else{
          itemsArr = [];
          alert("Please, select Type for each line.");
          return;
        }
      }
    }else{
      alert("Please, select Lines and Plan.");
      return;
    }
    itemsArr.push(plan);

    const call_key =  this.formData.get('call_key').value;
    const order_number = this.formData.get('order_number').value;
    const customer_id = this.formData.get('customer_id').value;
    const data = [
      { 
        "call_key":call_key.toString(),
        "order_number": order_number.toString(),
        "customer_id": customer_id.toString(),
        "items": itemsArr
      }
    ];

    var result = await this.newOrderService.putNewOrder( data );
    if( result && result[0]['id'] ){
      this.message$ = 'The order was posted successfully.';
      this.result$ = {width:'100%', height: 'auto', 'padding': 0, 'margin-bottom': '1em', 'backgroundColor':'var(--green-100)'};
      this.posted$ = true;
    }else{
      this.message$ = 'The order was not ';
      this.result$ = {width:'100%', height: 'auto', 'padding': 0, 'margin-bottom': '1em', 'backgroundColor':'var(--pink-200)'};
    }
    this.formData.get('first_name').disable();
    this.formData.get('last_name').disable();
    this.formData.get('phone_number').disable();
  }

  toRegister(){
    this.router.navigate(['/register'], { queryParams: {agentId: this.agentId }});
  }
}
