import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomerApiService } from 'src/app/frontier/utils/services/api/customer-api.service';
import { ErrorInterface } from 'src/app/frontier/utils/services/interfaces/common/error-interface';
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
  @ViewChild('configurationForm') configurationForm;
  submitted = false;
  loading = false;
  error: ErrorInterface;
  configurationValues: ConfiguredValue[];
  alertMessage = "";

  constructor(private childEntityService: ChildEntityService, private customerApiService: CustomerApiService) { }

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

  async onSubmit() {
    const numberPortabilityCustomizationName = "Would you like to keep your current phone number, or get a new phone number?";
    this.submitted = true;
    if (this.configurationForm.valid) {
      if (this.childEntity.Name === numberPortabilityCustomizationName) {
        await this.determineNumberPortability(this.getNumberFromConfigurationValues(this.configurationValues));
      }
      this.showConfiguration = false;
      this.childEntity.ConfiguredValue = this.configurationValues;
      if (this.childEntity.hasOwnProperty('Active')) {
        this.childEntityService.selectCustomization(this.childEntity);
      }
    }
  }

  private getNumberFromConfigurationValues(configurationValues: ConfiguredValue[]) {
    const portableNumber = configurationValues.filter((value) => {
      return value.Name === 'TN';
    })
    if (portableNumber.length > 0) {
      return portableNumber[0].Value[0].Value
    }
    return null;
  }

  private async determineNumberPortability(phoneNumber) {
    try {
      this.loading = true;
      const response = await this.customerApiService.numberPortability(phoneNumber);
      this.loading = false;
      if (response.isPortable) {
        this.alertMessage = `Congratulations your Phone Number ${response.phoneNumber} is Portable`;
      }
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }


  }

}
