import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent implements OnInit {

  @Input() loading;
  @Output() redirect = new EventEmitter();
  showBillingAddressForm = false;
  constructor() { }

  ngOnInit(): void {
  }

  onContinue() {
    if (this.showBillingAddressForm) {

    }
    else {
      this.redirect.emit();
    }
  }
}
