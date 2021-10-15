import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getAllEarthlinkOffers, getCurrentProduct, sendProductActionRequestResult  } from '../../+state/offers/earthlink-offers.selectors';
import { getParsedAddress, sendProductActionRequest } from '@nx/earthlink/offers';
import { faBars, faWifi, faMapMarkerAlt, faPencilAlt, faChartLine, faBolt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductState } from '../../+state/offers/earthlink-offers.reducer';

@Component({
  selector: 'nx-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  /** Icons **/
  faBars = faBars;
  faWifi = faWifi;
  faMapMarkerAlt = faMapMarkerAlt;
  faPencilAlt = faPencilAlt;
  faChartLine = faChartLine;
  faBolt = faBolt;
  faArrowRight = faArrowRight;

  congrats: any = null
  stateSubscription: Subscription | undefined;
  offers$: any = null;
  //product$: any = null;
  productState: ProductState = {};
  /***** MODAL *****/
  selectedProduct: any = null
  selectedProductId: any = null;
  modalReference: any = null;

  parsedAddress$: any = null;


  /**** Modal ****/
  @ViewChild('editProductModal') editProductModal : TemplateRef<any> | undefined;

  constructor(
    private store: Store,
    private modalService: NgbModal,
    private router: Router,
  ) { 
    this.stateSubscription = this.store.select(getAllEarthlinkOffers).subscribe((offers) =>{
      if( offers ){
        this.offers$ = offers;
      }
    });
    this.stateSubscription.unsubscribe;

    /****** Listening the State after send Product to the Store *****/
    this.stateSubscription = this.store.select(sendProductActionRequestResult).subscribe((productState) => {
      if( productState){
        this.productState = productState;
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
      /**** Retrieve (if any) selected product****/
      this.getProduct();
      /*******************************************/
      this.parsedAddress$ = this.store.pipe(select(getParsedAddress));
      this.visibleApp = true;
    }
  }

  selectProductFunction( product: any ){
    this.selectedProduct = product;
    this.selectedProductId = product.id;
  }

  seeDetails( product: any ){
    this.selectedProduct = product;
    this.modalReference = this.modalService.open(this.editProductModal, { size: 'lg', backdrop: 'static'});
  }

  closeModal(){
    this.modalReference.close();
  }

  sendProduct(){
    if( this.selectedProduct ){
      this.store.dispatch(sendProductActionRequest({ product: this.selectedProduct }));
      if(!this.productState.error){
        this.router.navigate(["/account"]);
      }
    }
  }

  /***** Retreiving selected product from the store *****/
  getProduct(){
    this.stateSubscription = this.store.select(getCurrentProduct).subscribe((product) => {
      if( product ){
        this.selectProductFunction( product );
      }
    })
    this.stateSubscription.unsubscribe;
  }

  intPart( value: any ){
    return parseInt( value )
  }

  decPart( value: any ){
    let n = Math.abs( value );
    let m = n - Math.floor( value );
    return m.toFixed(2);
  }
}
