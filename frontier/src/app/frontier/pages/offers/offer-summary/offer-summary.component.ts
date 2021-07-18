import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { OffersInterface } from 'src/app/frontier/utils/services/interfaces/products/offers-interface';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTty } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-offer-summary',
  templateUrl: './offer-summary.component.html',
  styleUrls: ['./offer-summary.component.css']
})
export class OfferSummaryComponent implements OnInit {
  faWifi = faWifi;
  faUpload = faUpload;
  faDownload = faDownload;
  faBars = faBars;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faVoice = faTty;
  faPlus = faPlus
  @Output() goBack = new EventEmitter();
  @Output() submitOffers = new EventEmitter();
  @Input() offers: OffersInterface[];

  getMonthlyTotalPrice() {
    let totalMonthly = 0;
    for (let product of this.offers) {
      totalMonthly += product.bestPriceTerm.discountedPrice;
    }
    return totalMonthly;
  }


  getIcon(icon: string) {
    switch (icon) {
      case "Broadband":
        return faWifi;
      case "Voice":
        return this.faVoice;
      case "Broadband":
        return this.faPlus;
    }
  }

  ngOnInit(): void {
  }

}
