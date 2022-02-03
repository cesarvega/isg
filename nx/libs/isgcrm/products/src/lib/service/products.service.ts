import { Injectable } from '@angular/core';
import { SYSTEM_CONFIG } from '@nx/isgcrm/config';
import { ApiService } from '@nx/isgcrm/common';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  token: any;
  headers: any = null;

  constructor(
    private apiService: ApiService,
  ) { }

  getPartners(){
    return this.apiService.get(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.PARTNERS_PATH, undefined);
  }
  getCatalog(){
    return this.apiService.get(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.CATALOG_BY_PROVIDER);
  }
}
