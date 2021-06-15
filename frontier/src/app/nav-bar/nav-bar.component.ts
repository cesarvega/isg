import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutAction } from '../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {



  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit(): void {

  }

  logout() {
    this.store.dispatch(logoutAction());
    this.router.navigate(["/login"]);
  }

}
