import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-case-selector',
  templateUrl: './test-case-selector.component.html',
  styleUrls: ['./test-case-selector.component.css']
})
export class TestCaseSelectorComponent implements OnInit {

  production = environment.production;
  @Input() testCases;
  @Output() selectTestCase = new EventEmitter();
  selectedTestCase: string;
  constructor() { }

  ngOnInit(): void {
  }


}
