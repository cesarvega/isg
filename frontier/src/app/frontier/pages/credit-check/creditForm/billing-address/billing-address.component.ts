import { Component, Input, OnInit } from '@angular/core';
import { states } from "../../../../../../utils/states";

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent implements OnInit {
  states = states;
  @Input() address;
  @Input() submitted;
  constructor() { }

  ngOnInit(): void {
  }

}
