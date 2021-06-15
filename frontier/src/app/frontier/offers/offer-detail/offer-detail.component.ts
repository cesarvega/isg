import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OffersInterface } from '../../services/interfaces/products/offers-interface';
import { OffersService } from '../../services/helpers/offers.service';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  faWifi = faWifi;
  @Input() offer: OffersInterface = null;
  @Output() selectProduct = new EventEmitter<OffersInterface>();
  @Output() removeProduct = new EventEmitter<OffersInterface>();
  constructor(public offerService: OffersService) { }

  ngOnInit(): void {
  }

  addProduct(offer: OffersInterface) {
    this.selectProduct.emit(offer);
  }
  deleteProduct(offer: OffersInterface) {
    this.removeProduct.emit(offer);
  }

}
