import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConfiguredValue, ChildEntity } from '../../../../utils/store/interfaces/quote';
import { ChildEntityService } from '../../helpers/child-entity.service';

@Component({
  selector: 'app-child-entity-configuration',
  templateUrl: './child-entity-configuration.component.html',
  styleUrls: ['./child-entity-configuration.component.css']
})
export class ChildEntityConfigurationComponent implements OnInit {

  @Input() childEntity: ChildEntity;
  @Input() showConfiguration: boolean;
  constructor(private childEntityService: ChildEntityService) { }
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
      this.showConfiguration = false;
      this.childEntity.ConfiguredValue = this.configurationValues;
      if (this.childEntity.hasOwnProperty('Active')) {
        this.childEntityService.selectCustomization(this.childEntity);
      }
    }
  }

}
