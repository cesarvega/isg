import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ChildEntity } from 'src/app/frontier/utils/store/interfaces/quote';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customization-result',
  templateUrl: './customization-result.component.html',
  styleUrls: ['./customization-result.component.css']
})
export class CustomizationResultComponent implements OnInit {

  faBars = faBars;
  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight

  @Output() goBack = new EventEmitter();
  @Output() submitCustomizations = new EventEmitter();
  @Input() monthlyCustomizations: ChildEntity[];
  @Input() oneTimeCustomizations: ChildEntity[];
  constructor() { }

  ngOnInit(): void {
  }

  getMonthlyTotalPrice() {
    let totalMonthly = 0;
    for (let customization of this.monthlyCustomizations) {
      for (let price of customization.Price) {
        totalMonthly += parseFloat(price.rateRecurring);
      }
    }
    return totalMonthly;
  }

  getOneTimeTotalPrice() {
    let sum = 0;
    for (let customization of this.oneTimeCustomizations) {
      for (let price of customization.Price) {
        sum += parseFloat(price.rateNonRecurring);
      }
    }
    return sum;
  }

  isCustomizationMonthly(customization: ChildEntity) {

  }

}
