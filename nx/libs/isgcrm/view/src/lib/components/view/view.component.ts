import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { FormGroup, FormControl } from '@angular/forms';

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

  partnerId: number = 0;
  partnerName: any = null;
  catalogId: number = 0;
  selectedCatalog: any = null;
  formData!: any;
  selectedProductType: any = null;
  selectedProductTypeId: any = null;
  productFeatures: any = [];
  disabled: boolean = true;

  list2: any = [];
  list4: any = [];

    // productType: any =[
    //   {id: null, name:'---'},
    //   {id: 1, name: 'Video'},
    //   {id: 2, name: 'Audio'},
    //   {id: 3, name: 'Internet'},
    // ]

    catalog: any = [];

    featureType: any =[];

  ngOnInit(): void {
    if( localStorage.getItem('partnerName') ){
      this.partnerName = localStorage.getItem('partnerName');
    }
    this.actRoute.params
      .subscribe(params => {
        this.partnerId = params.partnerId;
        this.catalogId = params.catalogId;
      });

    let catalogP:any =  localStorage.getItem('catalog');
    this.catalog = JSON.parse( catalogP );

    if( this.catalogId > 0 ){
      this.selectedCatalog = this.catalog.find( (x:any) => x.id == this.catalogId );
      if( this.selectedCatalog ){
        //this.selectedProductType = this.selectedCatalog.type;
        //let productTypeId = this.productType.find( (x:any) => x.name == this.selectedProductType );
        //this.selectedProductTypeId = productTypeId.id;

        //this.list2 = [{id:1, name: this.selectedCatalog.type}];
        //this.list4 = this.getFeatures(this.selectedProductTypeId);
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
