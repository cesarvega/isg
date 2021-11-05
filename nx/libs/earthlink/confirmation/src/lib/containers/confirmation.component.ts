import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOGOUT, CONFIRMATION } from '@nx/earthlink/shared';
import { getConfirmationState } from '@nx/earthlink/state';
import { Route, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { confirmationSuccess } from '../..';

@Component({
  selector: 'nx-containers',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  stateSubscription: Subscription | undefined;

  constructor(
    private store: Store,
    private router: Router,
  ) { 

    this.stateSubscription = this.store.select(getConfirmationState).subscribe( (confirmation) =>{
      if( !confirmation.response ){
        this.router.navigate( ['./']);
      }
    })


  }



  ngOnInit(): void {
    this.store.dispatch(CONFIRMATION());
  }
  error: boolean = false;

  restartOrder(){
    if( confirm('Start/reset the application?') ){
        this.store.dispatch(LOGOUT());
    }
}

}
