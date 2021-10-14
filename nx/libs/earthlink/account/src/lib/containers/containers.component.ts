import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'nx-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {

  /*** ICONS ****/
  faBars = faBars;

  errors: any = null;

  
  constructor(
    private store: Store,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

}
