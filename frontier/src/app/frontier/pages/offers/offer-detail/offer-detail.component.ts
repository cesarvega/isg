import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OffersInterface } from '../../../utils/services/interfaces/products/offers-interface';
import { OffersService } from '../../../utils/services/helpers/offers.service';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  faTimes = faTimes;
  faWifi = faWifi;
  faUpload = faUpload;
  faDownload = faDownload;
  @Input() loading;
  @Input() offer: OffersInterface = null;
  @Output() selectEvent = new EventEmitter<OffersInterface>();
  @Output() removeEvent = new EventEmitter<OffersInterface>();
  constructor(public offerService: OffersService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addProduct(offer: OffersInterface) {
    this.selectEvent.emit(offer)
    //this.selectProduct.emit(offer);
  }
  deleteProduct(offer: OffersInterface) {
    this.removeEvent.emit(offer);
  }

  openOffersDetailsModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}
