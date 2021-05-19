import { Component, OnInit, Input } from '@angular/core';
import { OffersInterface } from '../../interfaces/offers-interface';
import { OffersService } from '../../services/offers.service';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  faWifi = faWifi;
  @Input() offer: OffersInterface = null;
  constructor(public offerService: OffersService) { }

  ngOnInit(): void {
  }

}
