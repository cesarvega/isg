import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getAllEarthlinkOffers } from '../../+state/offers/earthlink-offers.selectors';
import { getParsedAddress, sendProductActionRequest } from '@nx/earthlink/offers';
import { faBars, faWifi, faMapMarkerAlt, faPencilAlt, faChartLine, faBolt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getCurrentProduct } from '../../+state/offers/earthlink-offers.selectors';
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
  product$: any = null;

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
    }
  }

  /***** Retreiving selected product from the store *****/
  getProduct(){
    this.stateSubscription = this.store.select(getCurrentProduct).subscribe((product) => {
      if( product ){
        this.selectProductFunction( product );
      }
    })
  }
}
