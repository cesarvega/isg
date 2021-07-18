import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { OffersInterface } from 'src/app/frontier/utils/services/interfaces/products/offers-interface';

@Component({
  selector: 'app-offer-summary',
  templateUrl: './offer-summary.component.html',
  styleUrls: ['./offer-summary.component.css']
})
export class OfferSummaryComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  @Output() goBack = new EventEmitter();
  @Output() submitOffers = new EventEmitter();
  @Input() offers: OffersInterface[];
  constructor() { }

  ngOnInit(): void {
  }

}
