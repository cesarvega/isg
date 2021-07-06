import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-credit-result',
  templateUrl: './credit-result.component.html',
  styleUrls: ['./credit-result.component.css']
})
export class CreditResultComponent implements OnInit {

  @Output() onContinue = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
