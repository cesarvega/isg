import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { DisclosureInterface } from '../../../utils/services/interfaces/disclosures/disclosure-interface';

@Component({
  selector: 'app-disclosure-item',
  templateUrl: './disclosure-item.component.html',
  styleUrls: ['./disclosure-item.component.css']
})
export class DisclosureItemComponent implements OnInit {
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  @Input() disclosure: DisclosureInterface;
  @Output() onAcceptDisclosure = new EventEmitter<string>();

  acceptedStatus = "ACCEPT";
  pdfLoaded = false;
  constructor(private elRef: ElementRef) { }
  customerAgrees = false;

  ngOnInit(): void {
  }

  // for transcluded content
  ngAfterContentInit() {

  }


  afterPdfLoad() {
    this.pdfLoaded = true;
    this.changeContainerCss();
  }

  private changeContainerCss() {
    let ng2Container = this.elRef.nativeElement.querySelector('.ng2-pdf-viewer-container');
    if (ng2Container)
      ng2Container.style.position = "unset";
  }

  onChangeCheckbox() {
    this.customerAgrees = !this.customerAgrees;
    if (this.customerAgrees) {
      this.acceptDisclosure();
    }
  }

  acceptDisclosure() {
    this.disclosure.status = this.acceptedStatus
    this.onAcceptDisclosure.emit(this.disclosure.name)
  }

  isDisclosureAccepted() {
    return this.disclosure.status == this.acceptedStatus;
  }

}
