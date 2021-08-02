import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAccordion, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DisclosuresApiService } from '../../utils/services/api/disclosures-api.service';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { DisclosureInterface } from '../../utils/services/interfaces/disclosures/disclosure-interface';
import { SnapshotStore } from '../../utils/services/state.service';
import { Steps } from '../../utils/steps';
import { setStepAction } from '../../utils/store/actions';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-disclosure',
  templateUrl: './disclosure.component.html',
  styleUrls: ['./disclosure.component.css']
})
export class DisclosureComponent implements OnInit {
  production = environment.production;
  quoteId: string;
  disclosures: DisclosureInterface[];
  loading: boolean = false;
  error: ErrorInterface;
  activeDisclosure;
  @ViewChild('accordion') accordionComponent: NgbAccordion;

  constructor(
    private disclosuresApiService: DisclosuresApiService, private snapShotStore: SnapshotStore, private router: Router, private store: Store<any>) { }

  ngOnInit(): void {
    this.quoteId = this.snapShotStore.getQuoteId();
    this.getDiscloures()
  }

  private async getDiscloures() {
    this.loading = true;
    try {
      this.disclosures = await this.disclosuresApiService.getDisclosures(this.quoteId);
      if (this.disclosures.length > 0) {
        this.activeDisclosure = this.disclosures[0].name;
      }
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
    const currentIndex = this.disclosures.findIndex((iterateDisclosure) => {
      return iterateDisclosure.name === disclosureName;
    })
    const length = this.disclosures.length - 1;
    if (currentIndex < length) {
      const newIndex = currentIndex + 1;
      this.activeDisclosure = this.disclosures[newIndex].name
    }
  }

  acceptAllDisclosures() {
    for (let disclosure of this.disclosures) {
      disclosure.status = "ACCEPT"
    }
  }

  showContinueButton() {
    const lengthDisclosuresAccepted = this.disclosures.filter((disclosure) => {
      return disclosure.status === "ACCEPT";
    }).length;
    return lengthDisclosuresAccepted === this.disclosures.length
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
