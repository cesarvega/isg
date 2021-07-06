import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAccordion, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DisclosuresApiService } from '../../utils/services/api/disclosures-api.service';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { DisclosureInterface } from '../../utils/services/interfaces/disclosures/disclosure-interface';
import { StateService } from '../../utils/services/state.service';
import { Steps } from '../../utils/steps';
import { setStepAction } from '../../utils/store/actions';



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
  @ViewChild('accordion') accordionComponent: NgbAccordion;

  constructor(
    private disclosuresApiService: DisclosuresApiService, private stateService: StateService, private router: Router, private store: Store<any>) { }

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

  toggleDisclosure(disclosureName: string) {
    this.accordionComponent.toggle(disclosureName)
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
    this.store.dispatch(setStepAction({ step: Steps.billingStep }))
    this.router.navigate([Steps.billingStep.url]);
  }



}
