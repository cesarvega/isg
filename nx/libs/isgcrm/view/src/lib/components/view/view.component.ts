import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'nx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

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
  list4: any = [];

    productType: any =[
      {id: null, name:'---'},
      {id: 1, name: 'Video'},
      {id: 2, name: 'Audio'},
      {id: 3, name: 'Internet'},
    ]

    products: any = [];

    featureType: any =[];

  ngOnInit(): void {
    if( localStorage.getItem('partnerName') ){
      this.partnerName = localStorage.getItem('partnerName');
    }
    this.partnerId = this.actRoute.snapshot.queryParams.get('partnerId');
    this.productId = this.actRoute.snapshot.paramMap.get('productId');

    let productsV:any =  localStorage.getItem('products');
    this.products = JSON.parse( productsV );

    if( this.productId ){
      this.selectedProduct = this.products.find( (x:any) => x.id == this.productId );
      if( this.selectedProduct ){
        this.selectedProductType = this.selectedProduct.type;
        let productTypeId = this.productType.find( (x:any) => x.name == this.selectedProductType );
        this.selectedProductTypeId = productTypeId.id;

        this.list2 = [{id:1, name: this.selectedProduct.type}];
        this.list4 = this.getFeatures(this.selectedProductTypeId);
      }
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
    //if(this.partnerId){
      this.route.navigate(['products']);
    //}
  }


}
