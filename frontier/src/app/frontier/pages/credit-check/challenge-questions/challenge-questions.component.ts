import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreditCheckResultInterface } from 'src/app/frontier/utils/services/interfaces/customer/credit-check-result';
import { SecurityChallengeQuestionsRequestInterface } from './helpers/interfaces/securityChallengeQuestionRequest.interface';

@Component({
  selector: 'app-challenge-questions',
  templateUrl: './challenge-questions.component.html',
  styleUrls: ['./challenge-questions.component.css']
})
export class ChallengeQuestionsComponent implements OnInit {

  @Input() creditCheckResult: CreditCheckResultInterface
  @Output() submitIdentityForm = new EventEmitter<SecurityChallengeQuestionsRequestInterface>();
  constructor() { }

  ngOnInit(): void {
  }

}
