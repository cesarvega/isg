import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ChildEntity } from 'src/app/frontier/utils/store/interfaces/quote';

@Component({
  selector: 'app-customization-result',
  templateUrl: './customization-result.component.html',
  styleUrls: ['./customization-result.component.css']
})
export class CustomizationResultComponent implements OnInit {

  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight

  @Output() goBack = new EventEmitter();
  @Output() submitCustomizations = new EventEmitter();
  @Input() selectedCustomizations: ChildEntity[];
  constructor() { }

  ngOnInit(): void {
  }

}
