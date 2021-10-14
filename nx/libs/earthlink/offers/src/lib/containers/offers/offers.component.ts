import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getAllEarthlinkOffers } from '../../+state/offers/earthlink-offers.selectors';
import { getParsedAddress, getProducts } from '@nx/earthlink/offers';
import { faBars, faWifi, faMapMarkerAlt, faPencilAlt, faChartLine, faBolt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  congrats: any = null
  stateSubscription: Subscription | undefined;
  offers$: any = null;

  /***** MODAL *****/
  productSelected: any = null;
  productId: any = null;
  modalReference: any = null;

  parsedAddress$: any = null;
  //products$ = this.store.pipe(select(getProducts));
  selectedProduct: any = null;

  @ViewChild('editModal') editModal : TemplateRef<any> | undefined;

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
      this.parsedAddress$ = this.store.pipe(select(getParsedAddress));
      this.visibleApp = true;
    }
  }

  selectProduct( product: any ){
    this.productId = product.id;
  }

  seeDetails( product: any ){
    this.productSelected = product;
    this.modalReference = this.modalService.open(this.editModal, { size: 'lg', backdrop: 'static'});
  }

  closeModal(){
    this.modalReference.close();
  }
}
