import { Injectable } from '@angular/core';
import { IdentityFormInterface, AccountFormInterface } from '../../interfaces/customer/credit-check-form';
import { CustomerInterface, ContactInterface, AddressInterface } from '../../interfaces/customer/customer';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CustomerContactBuilder {

  constructor() { }

  buildAccountAndVerifyInformation(accountForm: AccountFormInterface, identityForm: IdentityFormInterface, customer: CustomerInterface, address: AddressInterface): CustomerInterface {
    // This parse is being done in order to do not send billing address as empty, since this returns an error in the api,
    // instead I am not sending it at all
    let requestAddress = { ...address }
    if (!requestAddress.addressLine2)
      delete requestAddress.addressLine2
    customer = {
      ...customer,
      accountName: accountForm.firstName + " " + accountForm.lastName,
      firstName: accountForm.firstName,
      lastName: accountForm.lastName,
      billing: { billingAddress: accountForm.billingAddress ? accountForm.billingAddress : requestAddress },
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
      fullName: accountForm.firstName + " " + accountForm.lastName,
      firstName: accountForm.firstName,
      lastName: accountForm.lastName,
      emailAddresses: {
        item: [
          {
            address: accountForm.email,
            isPrimary: true
          }
        ]
      },
      telephones: {
        item: [{
          isPrimary: true,
          phoneType: "Mobile",
          phoneNumber: accountForm.phoneNumber,
        }, {
          isPrimary: false,
          phoneType: "Mobile",
          phoneNumber: accountForm.secondaryPhoneNumber
        }
        ]
      },
      creditProfile: {
        ssn: identityForm.ssn,
        dateOfBirth: moment(identityForm.dateOfBirth, "MM/DD/YYYY").format("YYYY-MM-DD")
      }
    }
    customer.contacts = { item: [primaryContact] };
    return customer;
  }

}
