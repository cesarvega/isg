import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router: Router,
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
    equipmentDescription: "Equipment description",
    terms: "bla bla blaterms",

  }

   Validate(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjQyMTg5MSwiZXhwIjoxNjMyNDI1NDkxLCJuYmYiOjE2MzI0MjE4OTEsImp0aSI6IlhwOVVJa01RQkM3cW5ZSW4iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.4vOLBNAcRwR7GZHw0dyRMSh_biXOx_1aNJ_kYkS8aSI',
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    this.http.get(
      SYSTEM_CONFIG.API_URL + ENDPOINT.offers.path
      ,options).subscribe(
      () => this.router.navigate([ENDPOINT.offers.navigate]),
      // (error) => this.handleError( error )
      () => this.router.navigate([ENDPOINT.address.navigate])
    )   
  }
  
  handleError( result:any )
  {
    const arr:any = Object.keys(result).map(function(k) { return result[k] });
    console.log( arr );


  }

  ngOnInit(): void {
  }

}
