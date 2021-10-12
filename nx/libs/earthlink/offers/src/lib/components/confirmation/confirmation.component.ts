import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faSpinner, faIcons } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'nx-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  faSpinner = faSpinner;
  agreeCheckBox = false;
  faAngleLeft = faAngleLeft;
  faIcon = faIcons.icon;
  @Input() loading = false;
  @Output() submit = new EventEmitter();
  @Output() showPlans = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
