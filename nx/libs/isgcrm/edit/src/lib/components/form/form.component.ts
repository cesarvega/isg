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

    productType: any =[
      {id: null, name:'---'},
      {id: 1, name: 'Video'},
      {id: 2, name: 'Audio'},
      {id: 3, name: 'Internet'},
    ]

    products: any = [
      {id: 1, type: 'Video', description: 'Product video 1 description', features: '[34,35]', revenue: '123', start:'01/30/2020', end:'01/11/2021'},
      {id: 2, type: 'Video', description: 'Product video 2 description', features: '[36,37]', revenue: '124', start:'01/30/2020', end:'01/11/2021'},
      {id: 3, type: 'Video', description: 'Product video 3 description', features: '[38,39]', revenue: '125', start:'01/30/2020', end:'01/11/2021'},
      {id: 4, type: 'Video', description: 'Product video 4 description', features: '[40,41]', revenue: '126', start:'01/30/2020', end:'01/11/2021'},
    ];

    featureType: any =[];

  ngOnInit(): void {
    this.createForm();
    if( localStorage.getItem('partnerName') ){
      this.partnerName = localStorage.getItem('partnerName');
    }
    this.partnerId = this.actRoute.snapshot.paramMap.get('partnerId');
    this.productId = this.actRoute.snapshot.paramMap.get('productId');

    if( this.productId ){
      this.selectedProduct = this.products.find( (x:any) => x.id == this.productId );
      if( this.selectedProduct ){
        this.populateForm();
        console.log(this.selectedProduct);
      }
    }
  }

  selectedType(pType: any){
    console.log( pType.value );
    this.featureType =[
      {id: null, name:'---'},
      {id: 1, name: '23'},
      {id: 2, name: '45,56'},
      {id: 3, name: '99'},
    ];
  }

  selectedFeature( fType: any ){
    console.log( fType.value );
  }

  goPartners(){
    if(this.partnerId){
      this.route.navigate(['products']);
    }
  }

  createForm(){
    this.formData = new FormGroup({
      type: new FormControl(''),
      features: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl('')
    })
  }

  populateForm(){
    this.formData.patchValue({
      type: this.selectedProduct.type,
      features: this.selectedProduct.features,
      name: this.selectedProduct.description,
      price: this.selectedProduct.revenue
    })
  }
}
