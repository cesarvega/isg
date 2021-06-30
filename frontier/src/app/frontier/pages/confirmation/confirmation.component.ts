import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { BillingApiService } from './services/billing-api.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  error: ErrorInterface;
  loading = false;

  constructor(private billingApiService: BillingApiService) { }

  ngOnInit(): void {
    this.makeRequest(this.getBillPreview.bind(this));
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
