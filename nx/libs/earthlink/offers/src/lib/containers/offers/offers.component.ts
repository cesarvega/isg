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

  congrats: any = null
  stateSubscription: Subscription | undefined;
  offers$: any = null;
  parsedAddress$: any = null;
  //products$ = this.store.pipe(select(getProducts));
  selectedProduct: any = null;
  constructor(
    private store: Store,
    //private http: HttpClient,
    private router: Router,
  ) { 
    this.stateSubscription = this.store.select(getAllEarthlinkOffers).subscribe((offers) =>{
      if( offers && offers.availableProducts ){
        this.offers$ = offers.availableProducts;
        //console.log(this.offers$)
      }
    });
  }
  
  token:any = null;

  visibleApp = false;
  
  handleError( result:any )
  {
    const arr:any = Object.keys(result).map(function(k) { return result[k] });
    console.log( arr );


  }

  ngOnInit(): void {
    if( !this.offers$ ){
      this.router.navigate(['/address']);
    }else{
      this.parsedAddress$ = this.store.pipe(select(getParsedAddress));
      this.visibleApp = true;
    }
  }

}
