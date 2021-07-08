import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-continue-button',
  templateUrl: './continue-button.component.html',
  styleUrls: ['./continue-button.component.css']
})
export class ContinueButtonComponent implements OnInit {

  faArrowRight = faArrowRight;
  @Input() name: string;
  @Output() onContinueEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
