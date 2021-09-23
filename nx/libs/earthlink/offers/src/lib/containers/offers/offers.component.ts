import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SYSTEM_CONFIG } from '@nx/earthlink/config';
import { ENDPOINT } from '@nx/earthlink/api';

@Component({
  selector: 'nx-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) {
    this.Validate();
   }

  errorMsg = { 
    message : 'na',
    show: false,
  };
 
  product = 
    {
      name : "product A",
    priceMonthly: "123.45",
    equipmentPrice: "234,56",
    contract: 3,
    etfFee: 12.34,
    installationPrice: 34.56,
    activationFee: 12.34,
    downSpeed: 12,
    upSpeed:2,
    description: "ANy description",
    id:1234567
  };
  
  preSelectedProduct = {
    name: "any prod name",
    description: "a prod description",
    equipmentDescription: "Equipmen description",
    terms: "bla bla blaterms",

  }

   Validate(){
    this.http.get( SYSTEM_CONFIG.API_URL + ENDPOINT.offers.path ).subscribe(
      () => console.log('valid session'),
      (error) => alert( error )
    )    
  }

  ngOnInit(): void {
 
  }

}
