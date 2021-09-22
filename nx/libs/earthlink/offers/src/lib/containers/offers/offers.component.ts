import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'nx-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

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

  apiCall(){
    
  }

  ngOnInit(): void {

  }

}
