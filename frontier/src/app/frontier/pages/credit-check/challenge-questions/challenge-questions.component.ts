import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerApiService } from 'src/app/frontier/utils/services/api/customer-api.service';
import { TasksApiService } from 'src/app/frontier/utils/services/api/tasks-api.service.';
import { ErrorInterface } from 'src/app/frontier/utils/services/interfaces/common/error-interface';
import { CreditCheckResultInterface } from 'src/app/frontier/utils/services/interfaces/customer/credit-check-result';
import { creditCheckTaskName } from 'src/app/frontier/utils/taskNames';
import { SecurityChallengeQuestionsRequestInterface } from './helpers/interfaces/securityChallengeQuestionRequest.interface';
import { buildChallengeQuestionsRequest } from './helpers/services/buildChallengeQuestionsRequest';

@Component({
  selector: 'app-challenge-questions',
  templateUrl: './challenge-questions.component.html',
  styleUrls: ['./challenge-questions.component.css']
})
export class ChallengeQuestionsComponent implements OnInit {

  @Input() creditCheckResult: CreditCheckResultInterface
  @Output() submitIdentityForm = new EventEmitter<SecurityChallengeQuestionsRequestInterface>();
  error: ErrorInterface;
  loading = false;
  constructor(private store: Store<any>, private customerApiService: CustomerApiService, private tasksApiService: TasksApiService) {
  }

  ngOnInit(): void {
  }


  areQuestionsAnswered() {
    for (let question of this.creditCheckResult.fraudPrevention.securityChallengeQuestions) {
      if (!question.answerChoiceNumber) {
        window.scroll(0, 0)
        throw new Error("Need to answer all the questions");
      }
    }
  }
  private async getTasks() {
    return await this.tasksApiService.getTasks();
  }

  async submitQuestions() {
    this.loading = true;
    try {
      this.areQuestionsAnswered();
      this.runCreditCheck();
      await this.getTasks();
      await this.tasksApiService.closeTask(creditCheckTaskName);
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }

  async runCreditCheck() {
    const request = buildChallengeQuestionsRequest(this.creditCheckResult.fraudPrevention.securityChallengeQuestions);
    await this.customerApiService.creditCheck(request);
  }

}
