import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetOrderAction } from '../store/actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-frontier-main',
  templateUrl: './frontier-main.component.html',
  styleUrls: ['./frontier-main.component.css']
})
export class FrontierMainComponent implements OnInit {
  constructor(private store: Store<any>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  resetOrder() {
    this.store.dispatch(resetOrderAction());
    this.router.navigate(['addressSearch'], { relativeTo: this.route });
  }

}
