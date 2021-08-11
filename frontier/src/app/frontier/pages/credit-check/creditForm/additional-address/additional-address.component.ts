import { Component, Input, OnInit } from '@angular/core';
import { states } from "../../../../../../utils/states";

@Component({
  selector: 'app-additional-address',
  templateUrl: './additional-address.component.html',
  styleUrls: ['./additional-address.component.css']
})
export class AdditionalAddressComponent implements OnInit {
  states = states;
  @Input() address;
  @Input() submitted;
  constructor() { }

  ngOnInit(): void {
  }

}
