import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuoteId } from '../store/selectors';
import { OffersInterface } from '../interfaces/offers-interface';
import { Milestone2ApiService } from '../services/milestone2-api.service';
import { UserInterface } from '../interfaces/user-interface';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  quoteId: String;
  user: UserInterface;
  quoteSubscription$;
  loading: Boolean = false;
  offers: OffersInterface[] = []

  constructor(private store: Store<any>, private milestone2ApiService: Milestone2ApiService) {
    this.quoteSubscription$ = this.store.select(selectQuoteId).subscribe((quoteId) => {
      this.quoteId = quoteId;
    });
  }

  ngOnInit(): void {
    this.getOffers()
  }

  async getOffers() {
    this.loading = true;
    this.offers = await this.milestone2ApiService.getOffers(this.quoteId)
    this.loading = false
  }
  ngOnDestroy() {
    this.quoteSubscription$.unsubscribe();
  }

}
