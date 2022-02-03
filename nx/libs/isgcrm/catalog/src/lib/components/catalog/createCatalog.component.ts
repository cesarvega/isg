import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { map, tap } from 'rxjs/operators';

//import { SYSTEM_CONFIG } from '@nx/isgcrm/config';
import { ApiService } from '@nx/isgcrm/common';
import { CreateCatalogService } from '../../service/createCatalog.service';

@Component({
  selector: 'nx-products',
  templateUrl: './createCatalog.component.html',
  styleUrls: ['./createCatalog.component.scss'],

})
export class CreateCatalogComponent implements OnInit {

  partners: any = {};
  formData!: any;
  selectedPartner: any | undefined;

  token: any;
  headers: any = null;
  loading: boolean = false;
  objErrors = {
    status: 0,
    message: null
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    private createCatalogService: CreateCatalogService,

  ) {
    this.token = localStorage.getItem('token')
  }

  catalog: any = [];
  partnerId: any = null;
  partnerName: any = null;

  async ngOnInit() {

    /***********************************************
     * If the item [partners] isn't exists at localStorage,
     * pull it to the backend to create it
     */
    if (!localStorage.getItem('partners')) {
      this.getPartners();

    } else {
      /********************************************
       * Populating the dropdown
       */
      let p: any = localStorage.getItem('partners');
      var response = JSON.parse(p);
      /* TODO * */
      if (response && response["hydra:member"]) {
        this.partners = response["hydra:member"];
      }
    }

    this.partnerId = 1;/* TODO * */

    /********************************************
     * Load the products for the selected Partner
     */
    if (localStorage.getItem('partnerId')) {
      this.partnerId = localStorage.getItem('partnerId');
      this.partnerName = localStorage.getItem('partnerName');
      this.getCatalogByProvider(
        {
          value:
          {
            id: this.partnerId,
            name: 'this.partnerName'
          }
        }
      );

      // this.selectedPartner = this.partners.find( (x:any) => parseInt(x.id) === parseInt(this.partnerId) );
    }

  }

  getPartners() {
    this.createCatalogService.getPartners().subscribe((res: any) => {
      if (res['hydra:member']) {
        this.partners = res['hydra:member'];
      }
      this.partners.unshift({ id: 0, name: 'Select' });

      localStorage.setItem('partners', JSON.stringify(res));
    });
  }




  getCatalogByProvider(event: any) {
    this.catalog = [];
    this.createCatalogService.getCatalog().subscribe( (res: any) => {
    if ( res["hydra:member"] ) {
        this.catalog = res["hydra:member"];
        localStorage.setItem( 'catalog', JSON.stringify( this.catalog ) );
        localStorage.setItem( 'partnerId', event.value.id );
      }
    });
  }

  editProduct(id: number) {
    if (!this.partnerId) { alert('Choose Partner'); return; }
    if (id) {
      this.router.navigate(
        ['catalog/edit/' + this.partnerId + '/' + id]
      );
    } else {
      this.router.navigate(
        ['catalog/new/' + this.partnerId]
      );
    }
  }

  viewProduct(id: number) {
    this.router.navigate(
      ['catalog/view/' + id]
    );
  }
  // getPartnerName(partners: any){
  //   return partners.id === this.partnerId;
  // }
}
