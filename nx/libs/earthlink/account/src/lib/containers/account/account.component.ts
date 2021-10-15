import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { getCurrentProduct } from '@nx/earthlink/offers';

@Component({
  selector: 'nx-containers',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class ContainersComponent implements OnInit {

  /*** ICONS ****/
  faBars = faBars;

  errors: any = null;
  stateSubscription: Subscription | undefined;
  product$: any = null;
  constructor(
    private store: Store,
    private router: Router,

  ) { 
    this.stateSubscription = this.store.select(getCurrentProduct).subscribe((product) => {
      if( product ){
        this.product$ = product;
      }
    })
  }

  ngOnInit(): void {
    if( !this.product$ ){
      this.router.navigate(['/offers']);
    }
  }

}
