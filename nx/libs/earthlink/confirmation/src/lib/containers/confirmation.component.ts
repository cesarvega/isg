import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOGOUT, CONFIRMATION } from '@nx/earthlink/shared'
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
    this.store.dispatch(CONFIRMATION());
  }
  error: boolean = false;

  restartOrder(){
    if( confirm('Are you sure?') ){
        this.store.dispatch(LOGOUT());
    }
}

}
