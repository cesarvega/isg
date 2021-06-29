import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetOrderAction } from '../../utils/store/actions';
import { Router, ActivatedRoute } from '@angular/router';
import { selectTransactionId } from '../../utils/store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-frontier-main',
  templateUrl: './frontier-main.component.html',
  styleUrls: ['./frontier-main.component.css']
})
export class FrontierMainComponent implements OnInit {
  transactionId$: Observable<string>;
  constructor(private store: Store<any>, private router: Router, private route: ActivatedRoute) {
    this.transactionId$ = this.store.select(selectTransactionId);
  }

  ngOnInit(): void {

  }

  resetOrder() {
    this.store.dispatch(resetOrderAction());
    this.router.navigate(['addressSearch'], { relativeTo: this.route });
  }

}
