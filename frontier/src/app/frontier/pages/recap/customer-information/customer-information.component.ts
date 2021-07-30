import { Component, Input, OnInit } from '@angular/core';
import { CreditFormInterface } from 'src/app/frontier/utils/services/interfaces/customer/credit-check-form';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent implements OnInit {

  @Input() creditForm: CreditFormInterface;
  @Input() parsedAddress: string;

  constructor() { }

  ngOnInit(): void {
  }

}
