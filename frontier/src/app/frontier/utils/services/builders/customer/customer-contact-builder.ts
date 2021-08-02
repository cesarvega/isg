import { Injectable } from '@angular/core';
import { CreditFormInterface } from '../../interfaces/customer/credit-check-form';
import { CustomerInterface, ContactInterface, AddressInterface } from '../../interfaces/customer/customer';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CustomerContactBuilder {

  constructor() { }

  buildAccountAndVerifyInformation(creditForm: CreditFormInterface, customer: CustomerInterface, address: AddressInterface): CustomerInterface {
    // This parse is being done in order to do not send billing address as empty, since this returns an error in the api,
    // instead I am not sending it at all
    let requestAddress = { ...address }
    if (!requestAddress.addressLine2)
      delete requestAddress.addressLine2
    customer = {
      ...customer,
      accountName: creditForm.firstName + " " + creditForm.lastName,
      firstName: creditForm.firstName,
      lastName: creditForm.lastName,
      billing: { billingAddress: requestAddress },
      communicationPreferences: {
        item: [
          {
            communicationType: "AccountInformation_email",
            optIn: true,
            mediaType: "Email"
          },
          {
            communicationType: "AccountInformation_mobile",
            optIn: true,
            mediaType: "Phone"
          }
        ]
      }
    }
    let primaryContact: ContactInterface = {
      primary: true,
      fullName: creditForm.firstName + " " + creditForm.lastName,
      firstName: creditForm.firstName,
      lastName: creditForm.lastName,
      emailAddresses: {
        item: [
          {
            address: creditForm.email,
            isPrimary: true
          }
        ]
      },
      telephones: {
        item: [{
          isPrimary: true,
          phoneType: "Mobile",
          phoneNumber: creditForm.phoneNumber,
        }, {
          isPrimary: false,
          phoneType: "Mobile",
          phoneNumber: creditForm.secondaryPhoneNumber
        }
        ]
      },
      creditProfile: {
        ssn: creditForm.ssn,
        dateOfBirth: moment(creditForm.dateOfBirth, "MM/DD/YYYY").format("YYYY-MM-DD")
      }
    }
    customer.contacts = { item: [primaryContact] };
    return customer;
  }

}
