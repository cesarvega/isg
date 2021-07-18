import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-no-payment',
  templateUrl: './no-payment.component.html',
  styleUrls: ['./no-payment.component.css']
})
export class NoPaymentComponent implements OnInit {

  faCheck = faCheck;
  @Output() continueEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }


}
