import { Component, OnInit, Input } from '@angular/core';
import { DisclosureInterface } from '../../../utils/services/interfaces/disclosures/disclosure-interface';

@Component({
  selector: 'app-disclosure-item',
  templateUrl: './disclosure-item.component.html',
  styleUrls: ['./disclosure-item.component.css']
})
export class DisclosureItemComponent implements OnInit {
  pdfSrc = "https://frontier.com/~/media/corporate/disclosures/install.ashx";
  @Input() disclosure: DisclosureInterface;
  acceptedStatus = "ACCEPT";
  constructor() { }

  ngOnInit(): void {
  }


  acceptDisclosure() {
    this.disclosure.status = this.acceptedStatus
  }

  isDisclosureAccepted() {
    return this.disclosure.status == this.acceptedStatus;
  }

}
