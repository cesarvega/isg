import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CreditCheckResultInterface } from 'src/app/frontier/utils/services/interfaces/customer/credit-check-result';

@Component({
  selector: 'app-credit-result',
  templateUrl: './credit-result.component.html',
  styleUrls: ['./credit-result.component.css']
})
export class CreditResultComponent implements OnInit {

  @Input() creditCheckResult: CreditCheckResultInterface;
  @Output() onContinue = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.creditCheckResult)
  }

}
