import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'nx-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
  ) { }

  partnerId: any = null;
  partnerName: any = null;
  productId: any = null;
  selectedProduct: any = null;
  formData!: any;
  selectedProductType: any = null;
  selectedProductTypeId: any = null;
  productFeatures: any = [];
  disabled: boolean = true;
  list2: any = [];
  list3: any = [];
  list4: any = [];
  showSourceControls: boolean = false;
  showTargetControls: boolean = false;
  featureList: any = [];
  temp:any = [];
  visible: boolean = true;

  productType: any =[
      {id: 1, name: 'Video'},
      {id: 2, name: 'Audio'},
      {id: 3, name: 'Internet'},
    ]

    products: any = [];

    featureType: any =[];

  ngOnInit(): void {
    this.createForm();
    if( localStorage.getItem('partnerName') ){
      this.partnerName = localStorage.getItem('partnerName');
    }
    this.partnerId = this.actRoute.snapshot.paramMap.get('partnerId');
    this.productId = this.actRoute.snapshot.paramMap.get('productId');

    let productsV:any =  localStorage.getItem('products');
    this.products = JSON.parse( productsV );

    if( this.productId ){
      this.selectedProduct = this.products.find( (x:any) => x.id == this.productId );
      if( this.selectedProduct ){
        this.selectedProductType = this.selectedProduct.type;
        let productTypeId = this.productType.find( (x:any) => x.name == this.selectedProductType );
        this.selectedProductTypeId = productTypeId.id;

        this.populateForm();
        this.list2 = this.productType.filter( (x:any) => x.name == this.selectedProductType );;
        this.list4 = this.getFeatures(this.selectedProductTypeId);
      }
    }else{
      this.selectedProduct ={
        description: "",
        end: "",
        features: "",
        id: 0,
        revenue: "",
        start: "",
        type: ""
      }
      this.disabled = false;
    }
  }

  getFeatures(id: any){
    this.featureType =[
      {id: 34, name: 'Feature id 34', key: 1},
      {id: 35, name: 'Feature id 35', key: 1},
      {id: 36, name: 'Feature id 36', key: 2},
      {id: 37, name: 'Feature id 37', key: 2},
      {id: 38, name: 'Feature id 38', key: 2},
      {id: 39, name: 'Feature id 39', key: 3},
      {id: 40, name: 'feature id 40', key: 3},
      {id: 41, name: 'feature id 41', key: 1},
    ];
    return this.featureType.filter( (x:any) => x.key === id );
  }

  selectedFeature( fType: any ){
    //console.log( 'selected feature:' + fType.value );
  }

  goPartners(){
    if(this.partnerId){
      this.route.navigate(['products']);
    }
  }

  createForm(){
    this.formData = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl('')
    })
  }

  populateForm(){
    this.formData.patchValue({
      name: this.selectedProduct.description,
      start: this.selectedProduct.start,
    })
  }

  onMoveToTarget( event: any ){
    this.visible = false;
    if( event && event.items && event.items[0].id ){
      const key = event.items[0].id;
      const arrTemp = this.getFeatures( key );

      for ( let opt in arrTemp ){
        this.temp.push(arrTemp[opt]);
      }
      this.list3 = this.temp;
      //this.list2 = arrTemp;
    }
    setTimeout(() => {
        this.visible = true;
      },10
    )
  }

  
  onMoveToSource( event: any ){
    if( event && event.items && event.items[0].id ){
      const key = event.items[0].id;
      const arrTemp3 = this.remFeatureItemsList3( key );

      this.list3 = arrTemp3;
      this.temp = arrTemp3;

      const arrTemp4 = this.remFeatureItemsList4( key );
      this.list4 = arrTemp4;
    }
    
  }

  remFeatureItemsList3(id: any){
    return this.list3.filter( (x:any) => x.key != id );
  }

  remFeatureItemsList4(id: any){
    return this.list4.filter( (x:any) => x.key != id );
  }

  onMoveAllToSource(){
    this.list2 = [];
    this.list3 = [];
    this.list4 = [];
    this.temp = [];
  }

  onMoveAllToTarget( event: any ){
    alert('Please, select one Class Type');
    this.onMoveAllToSource();
    this.productType = event.items;
  }
}
