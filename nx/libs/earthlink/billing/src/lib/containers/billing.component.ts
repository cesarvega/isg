import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';

import { BillingService } from '../services/billing.services';
import { getCurrentAccount } from '@nx/earthlink/account';

@Component({
  selector: 'nx-containers',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  stateSubscription: Subscription | undefined;
  account$: any = null;
  error$: any = null;
  billingData: any = null;


  constructor(
    private store: Store,
    private router: Router,
    private billingService: BillingService,
    private update$: Actions,
  ) { 

    this.stateSubscription = this.store.select(getCurrentAccount).subscribe((account) =>{
      this.account$ = account;
    })
  }

  ngOnInit(): void {
    if( !this.account$ ){
      this.router.navigate(['/account']);
    }
  }

}
