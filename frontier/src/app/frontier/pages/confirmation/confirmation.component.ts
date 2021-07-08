import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SubmitOrderResponseInterface } from '../../utils/services/interfaces/order/submit-order-response.interface';
import { selectOrder, selectTransactionId } from '../../utils/store/selectors';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  order$: Observable<SubmitOrderResponseInterface>;
  transactionId$: Observable<string>;

  constructor(private store: Store<any>) {
    this.order$ = this.store.select(selectOrder)
    this.transactionId$ = this.store.select(selectTransactionId);
  }

  ngOnInit(): void {

  }


}
