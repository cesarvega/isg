import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DisclosuresApiService } from '../services/api/disclosures-api.service';
import { ErrorInterface } from '../services/interfaces/common/error-interface';
import { DisclosureInterface } from '../services/interfaces/disclosures/disclosure-interface';
import { StateService } from '../services/state.service';



@Component({
  selector: 'app-disclosure',
  templateUrl: './disclosure.component.html',
  styleUrls: ['./disclosure.component.css']
})
export class DisclosureComponent implements OnInit {

  quoteId: string;
  disclosures: DisclosureInterface[];
  loading: boolean = false;
  error: ErrorInterface;

  @Output() onSubmitDisclosures = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal
    , private disclosuresApiService: DisclosuresApiService, private stateService: StateService) { }

  ngOnInit(): void {
    this.quoteId = this.stateService.getQuoteId();
    this.getDiscloures()
  }

  private async getDiscloures() {
    this.loading = true;
    try {
      this.disclosures = await this.disclosuresApiService.getDisclosures(this.quoteId);
    } catch (error) {
      this.error = error;
      this.disclosures = []
    }
    this.loading = false;
  }

  private areDisclosuresValid() {
    for (let disclosure of this.disclosures) {
      if (disclosure.status != "ACCEPT")
        return false
    }
    return true;
  }

  async submitDisclosures() {
    // validate disclosures

    if (!this.areDisclosuresValid()) {
      this.error = {
        message: "Disclosures must be accepted",
        errors: []
      }
      return;
    }

    // submit disclosures
    this.loading = true;
    try {
      let response = await this.disclosuresApiService.submitDisclosures(this.quoteId, { disclosures: this.disclosures });
    } catch (error) {
      this.loading = false;
      this.error = error;
      return
    }
    this.loading = false;
    // close modal
    this.onSubmitDisclosures.emit()
  }



}
