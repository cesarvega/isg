import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '@nx/isgcrm/common';
import { SYSTEM_CONFIG } from '@nx/isgcrm/config';
import { CustomHeaders } from '@nx/earthlink/shared';
import { map, tap } from 'rxjs/operators';
import { FeaturesService } from '../../services/features.services';

@Component({
  selector: 'nx-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  token: any;
  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
    private apiService: ApiService,
    private featureService: FeaturesService,
    
  ) { }
  primaryOpts: any = [];
  itemDetails: any = null;
  isPrimary: boolean = true;
  partnerId: any = null;
  partnerName: any = null;
  catalogId: any = null;
  selectedCatalog: any = null;
  formData!: any;
  selectedProductType: any = null;
  selectedProductTypeId: any = null;
  productFeatures: any = [];
  catalog: any = [];
  disabled: boolean = true;
  classType: Array<string> = [];
  list2: any = [];
  list3: any = [];
  list4: any = [];
  showSourceControls: boolean = false;
  showTargetControls: boolean = false;
  featureList: Array<string> = [];
  temp:any = [];
  visible: boolean = true;
  bkColor: any = '#689f38';
  headers: any = null;
  productType: any =[]

    products: any = [];

    featureType: any =[];

  ngOnInit(): void {
    this.createForm();
    if( localStorage.getItem('partnerName') ){
      this.partnerName = localStorage.getItem('partnerName');
    }
    this.partnerId = this.actRoute.snapshot.paramMap.get('partnerId');
    this.catalogId = this.actRoute.snapshot.paramMap.get('catalogId');

    let catalogP:any =  localStorage.getItem('catalog');
    this.catalog = JSON.parse( catalogP );

    if( localStorage.getItem('class_type') && localStorage.getItem('class_type') != 'undefined' ){
      let temp:any =  localStorage.getItem('class_type');
      this.classType = JSON.parse( temp );

      temp = localStorage.getItem('features');
      this.featureList = JSON.parse(temp);
    }else{
      this.getClassTypes();
      this.getFeatures();
    }

    if( this.catalogId ){
      this.selectedCatalog = this.catalog.find( (x:any) => x.id == this.catalogId );
      if( this.selectedCatalog ){
        //this.selectedProductType = this.selectedCatalog.type;
        //let productTypeId = this.productType.find( (x:any) => x.name == this.selectedProductType );
        //this.selectedProductTypeId = productTypeId.id;

        this.populateForm();
        //const ids = JSON.parse( this.selectedCatalog.features );

        //this.classType = this.productType.filter( (x:any) => x.name == this.selectedProductType );
        this.list4 = this.filterFeatures(this.selectedProductTypeId);
      }
    }else{
      this.bkColor = '#ff0000';
      this.selectedCatalog ={
        name: "",
        id: 0,
        revenue: "",
      }
      // this.selectedCatalog ={
      //   description: "",
      //   end: "",
      //   features: "",
      //   id: 0,
      //   revenue: "",
      //   start: "",
      //   type: ""
      // }
      this.disabled = false;
    }
  }

  filterFeatures(id: any){
    return this.featureList.filter( (x:any) => x.id == id );
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
      revenue: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl('')
    })
  }

  populateForm(){
    this.formData.patchValue({
      name: this.selectedCatalog.name,
      revenue: this.selectedCatalog.revenue,
      //start: this.selectedCatalog.start,
    })
  }

  onMoveToTarget( event: any ){
    this.visible = false;
    if( event && event.items && event.items[0].id ){
      const key = event.items[0].id;
      const arrTemp = this.filterFeatures( key );

      // for ( let opt in arrTemp ){
      //   this.temp.push(arrTemp[opt]);
      // }
      // this.list3 = this.temp;

    }

    if( this.list4 ){
      this.list4.map( (item:any) =>{
        console.log( item.description);
        //this.itemDetails.push(`${item.description}/{item.endDate}`);
      })
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
    return this.list3.filter( (x:any) => x.id != id );
  }

  remFeatureItemsList4(id: any){
    return this.list4.filter( (x:any) => x.id != id );
  }

  onMoveAllToSource(){
    //this.classType = [];
    this.list3 = [];
    this.list4 = [];
    this.temp = [];
  }

  onMoveAllToTarget( event: any ){
    alert('Please, select one Class Type');
    this.list2 = [];
    this.list3 = [];
    this.classType = event.items;
  }

  getClassTypes(){
    this.featureService.getClassType().subscribe( (res:any) => {
      if( res && res["hydra:member"] ){
        localStorage.setItem( 'class_type', JSON.stringify(
          res["hydra:member"]
        ));
        this.classType = res["hydra:member"];
      }
    });
  }


  getFeatures(){
    this.featureService.getFeatures().subscribe( (res:any) => {
      if( res && res["hydra:member"] ){
        localStorage.setItem( 'features', JSON.stringify( 
          res["hydra:member"]
          )
        );
        this.featureList = res["hydra:member"];
      }
    });
  }

  SelectedClassType( event:any ){
    this.list3 = [];
    this.isPrimary = true;
    if( event && event.value && event.value.primary && event.value.primary == true ){
      const endPointPref = `/revenues/${event.value.name}_class_types`;
      this.featureService.getPrimarys( endPointPref.toLocaleLowerCase() ).subscribe( (res: any) => {
        if( res && res["hydra:member"] ){
          this.list3 = res["hydra:member"];
        }
      });
    }else{
      const id = event.value.id;
      this.isPrimary = false;
      this.featureService.getFeatures().subscribe( (res: any) => {
        this.list3 = res["hydra:member"];
      });
      this.onlyPrimary();
    }
  }

  moreInformation( event: any ){
    console.log( event.value );
  }

  onlyPrimary(){
    if( localStorage.getItem( 'class_type' ) ){
      var primaryClass:any = localStorage.getItem( 'class_type' );
      primaryClass = JSON.parse( primaryClass );
      this.primaryOpts = primaryClass.filter( (item:any) => item.primary === true );
    }
  }
}
