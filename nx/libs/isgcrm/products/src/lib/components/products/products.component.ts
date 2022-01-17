import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api';
import { map, tap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { SYSTEM_CONFIG } from '@nx/isgcrm/config';
import { ApiService } from '@nx/isgcrm/common';
import { CustomHeaders } from '@nx/earthlink/shared';

@Component({
  selector: 'nx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [MessageService]
})
export class ProductsComponent implements OnInit {

  partners: any = {};
  formData!: any;
  selectedPartner: any | undefined;

  token: any;
  headers: any = null;
  loading: boolean = false;
  objErrors = {
    status: 0,
    description: null
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    private customHeaders: CustomHeaders,
  ) {
    this.token = localStorage.getItem('token'),
    this.headers = this.customHeaders.bearer( this.token );
  }

  products: any = [];
  partnerId: any = null;
  partnerName: any = null;

  async ngOnInit(){

    /***********************************************
     * If the item [partners] isn't exists at localStorage,
     * pull it to the backend to create it
     */
    if( !localStorage.getItem( 'partners' )){

      var response = await this.getPartners();

      /******************************************
       * Adding 'Select' option to the dropdown
       */
      let myArr = [{id:0, name: 'Select'}];
      for(let option in response ){
        myArr.push(response[option]);
      }     
      this.partners = myArr;
      
      /******************************************
      * Storing Partners object
      */
      localStorage.setItem('partners', JSON.stringify(myArr));

      //TODO pull it from backend
      let products=[
        {id: 1, type: 'Video', description: 'Product video 1 description', features: '[34,35]', revenue: '123', start:'01/30/2020', end:'01/11/2021'},
        {id: 2, type: 'Audio', description: 'Product Audio 2 description', features: '[36,37]', revenue: '124', start:'01/30/2020', end:'01/11/2021'},
        {id: 3, type: 'Internet', description: 'Product Internet 3 description', features: '[38,39]', revenue: '125', start:'01/30/2020', end:'01/11/2021'},
        {id: 4, type: 'Video', description: 'Product video 4 description', features: '[40,41]', revenue: '126', start:'01/30/2020', end:'01/11/2021'},
      ];
      /******************************************
       * Storing products
       */
      localStorage.setItem('products', JSON.stringify(
        products
      ))
    }
    
    /********************************************
     * Populating the dropdown
     */
    let p:any = localStorage.getItem('partners');
    var response = JSON.parse(p);
    this.partners = response;
    
    /********************************************
     * Load the products for the selected Partner
     */
    if( localStorage.getItem('partnerId') ){
      this.partnerId = localStorage.getItem( 'partnerId' );
      this.partnerName = localStorage.getItem( 'partnerName' );
      this.getPartnerProducts( 
        {
          value:
          {
            id: this.partnerId,
            name: this.partnerName
          }
        }
      );

      this.selectedPartner = this.partners.find( (x:any) => parseInt(x.id) === parseInt(this.partnerId) );
    }

  }

  getPartners(){
    return this.partners = this.apiService.get( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.PARTNERS_PATH, undefined, this.headers).pipe(
      map( (response: any) => {
          return response.data;
        }
      ),
      tap((request) =>{
          
        },(error) => {
          this.objErrors.status = error.status;
        }
      )
    ).toPromise()
  }




  getPartnerProducts(event: any){
    this.products = [];
    localStorage.removeItem( 'partnerId' );
    this.partnerId = null;
    
    if( event.value.id == 0 ) return
    this.loading = true;


    setTimeout(()=>{
      this.loading = false;
      let products: any = localStorage.getItem( 'products' );
      this.products = JSON.parse( products );
    }, 500);
    
    this.partnerId = event.value.id;
    localStorage.setItem( 'partnerId', this.partnerId );

    this.partnerName = event.value.name;
    if( this.partnerName ){
      localStorage.setItem( 'partnerName', this.partnerName );
    }
    
  }

  // getProducts( partnerId: any ){

  //   return this.apiService.get( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.PRODUCTS_PATH, {partnerId: partnerId} , this.headers)
  // }

  editProduct(id: number){
    if( !this.partnerId ){alert('Choose Partner'); return;}
    if( id ){
      this.router.navigate(['product/edit/' + this.partnerId + '/' + id]);
    }else{
      this.router.navigate(['product/new/' + this.partnerId]);
    }
  }

  viewProduct(id: number){
    this.router.navigate(['product/view/' + id]);
  }
  // getPartnerName(partners: any){
  //   return partners.id === this.partnerId;
  // }
}
