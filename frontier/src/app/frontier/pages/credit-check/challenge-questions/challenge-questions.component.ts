import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ErrorInterface } from 'src/app/frontier/utils/services/interfaces/common/error-interface';
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
  error: ErrorInterface;
  constructor() { }

  ngOnInit(): void {
  }

  submitQuestions() {
    try {
      for (let question of this.creditCheckResult.fraudPrevention.securityChallengeQuestions) {
        if (!question.answerChoiceNumber) {
          window.scroll(0, 0)
          throw new Error("Need to answer all the questions");
        }
      }
    } catch (error) {
      this.error = error;
    }
  }

}
