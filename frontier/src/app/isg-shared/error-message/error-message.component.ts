import { Component, OnInit, Input } from '@angular/core';
import { ErrorInterface } from '../../frontier/utils/services/interfaces/common/error-interface';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() error: ErrorInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
