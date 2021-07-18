import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConfiguredValue, ChildEntity } from '../../../../utils/store/interfaces/quote';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-child-entity-configuration',
  templateUrl: './child-entity-configuration.component.html',
  styleUrls: ['./child-entity-configuration.component.css']
})
export class ChildEntityConfigurationComponent implements OnInit {

  @Input() childEntity: ChildEntity;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }
  @ViewChild('configurationForm') configurationForm;
  submitted = false;
  configurationValues: ConfiguredValue[];


  ngOnInit(): void {
    this.configurationValues = this.childEntity.ConfiguredValue;
  }

  clearForm() {
    for (let configureValue of this.configurationValues) {
      if (configureValue.Value) {
        configureValue.Value[0].Value = ""
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.configurationForm.valid) {
      this.childEntity.ConfiguredValue = this.configurationValues;
      console.log(this.childEntity.ConfiguredValue);
      this.activeModal.close('Close click')
    }
  }

}
