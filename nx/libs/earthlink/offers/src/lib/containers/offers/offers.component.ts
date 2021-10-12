import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getAllEarthlinkOffers } from '../../+state/offers/earthlink-offers.selectors';
import { getParsedAddress, getProducts } from '@nx/earthlink/offers';

@Component({
  selector: 'nx-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  stateSubscription: Subscription | undefined;
  offers$: any = null;
  parsedAddress$ = this.store.pipe(select(getParsedAddress));
  products$ = this.store.pipe(select(getProducts));
  selectedProduct: any = null;
  constructor(
    private store: Store,
    //private http: HttpClient,
    private router: Router,
  ) {
    // if( localStorage.getItem('token')){
    //   this.token = localStorage.getItem('token');
    // }
    // this.Validate();
  }
  
  token:any = null;

  visibleApp = false;
  errorMsg = { 
    message : 'na',
    show: false,
  };


  // Validate(){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + this.token,
  //     'Accept': 'application/json'
  //   });

  //   let options = { headers: headers };
  //   this.http.get(SYSTEM_CONFIG.API_URL + ENDPOINT.offers.path, options).subscribe(
  //     () => {
  //       this.router.navigate([ENDPOINT.offers.navigate]);
  //       this.visibleApp = true;
      
  //     },
  //     // (error) => this.handleError( error )
  //     () => this.router.navigate([ENDPOINT.address.navigate])
  //   )   
  // }
  
  handleError( result:any )
  {
    const arr:any = Object.keys(result).map(function(k) { return result[k] });
    console.log( arr );


  }

  ngOnInit(): void {
    this.stateSubscription = this.store.select(getAllEarthlinkOffers).subscribe((offers) =>{
      this.offers$ = offers;
    })

    if( !this.offers$.request ){
      this.router.navigate(['/address']);
    }else{
      this.visibleApp = true;
    }
  }

}
