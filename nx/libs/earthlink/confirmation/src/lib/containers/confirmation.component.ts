import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOGOUT } from '@nx/earthlink/shared'
@Component({
  selector: 'nx-containers',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  restartOrder(){
    if( confirm('Are you sure?') ){
         this.store.dispatch(LOGOUT());
    }
}

}
