import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { acceptQuoteTaskName } from '../../utils/taskNames';
import { BillingApiService } from './services/billing-api.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  error: ErrorInterface;
  loading = false;
  billPreviewHtml;

  constructor(private billingApiService: BillingApiService, private sanitizer: DomSanitizer, private taskApiService: TasksApiService) { }

  ngOnInit(): void {
    this.initComponent();
  }

  async initComponent() {
    let response = await this.makeRequest(this.getBillPreview.bind(this));
    this.billPreviewHtml = this.sanitizer.bypassSecurityTrustHtml(response);
  }

  async placeOrder() {
    try {
      await this.taskApiService.closeTask(acceptQuoteTaskName);

    } catch (error) {
    }
  }

  private getBillPreview() {
    return this.billingApiService.getBillPreview();
  }

  private async makeRequest(request) {
    this.beforeRequest();
    try {
      return await request();
    } catch (error) {
      this.handleError(error);
      return;
    } finally {
      this.afterRequest();
    }
  }

  private beforeRequest() {
    this.loading = true;
  }

  private afterRequest() {
    this.loading = false;
  }

  private handleError(error) {
    this.error = error;
  }

}
