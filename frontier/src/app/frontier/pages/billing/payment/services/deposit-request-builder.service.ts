import { DepositResponse } from '../interfaces/deposit-requirements-response.interface';
import { PaymentFormInterface } from '../interfaces/payment.form.interface';
import { AccountIdInterface, ApportioningInterface, DepositRequestInterface } from '../interfaces/deposit-request.interface';
import { lineOfBusiness } from '../utils/line-of-business';
import { ContactInterface, CustomerInterface } from 'src/app/frontier/utils/services/interfaces/customer/customer';


const getEmailFromCustomer = (customer: CustomerInterface) => {
  const primaryContact: ContactInterface = customer.contacts.item.find((contactItem) => {
    return contactItem.primary;
  });
  if (primaryContact) {
    return primaryContact.emailAddresses.item[0].address;
  }
  return '';
}

export const buildDepositCollectionRequest = (depositRequirements: DepositResponse, fundingAccountToken: string, payment: PaymentFormInterface, customer: CustomerInterface, isBusiness: boolean) => {
  const paymentMethod = 'ONE_TIME_CARD';
  const note = 'Wallet Payment';
  const request: DepositRequestInterface = {
    lineOfBusiness,
    apportioning: buildApportioning(depositRequirements, customer, isBusiness),
    emailAddress: getEmailFromCustomer(customer),
    payment: {
      name: payment.nameOnCard,
      fundingAccountToken,
      addFundingAccountTokenToWallet: false,
      paymentMethod,
      total: getTotalPayment(depositRequirements),
      note,
    }
  };
  return request;
};

const getPhoneNumberFromCustomer = (customer: CustomerInterface): number => {
  try {
    return parseInt(customer.contacts.item[0].telephones.item[0].phoneNumber);
  } catch (error) {
    return null

  }
}

const buildApportioning = (depositRequirements: DepositResponse, customer: CustomerInterface, isBusiness: boolean): ApportioningInterface[] => {
  const primaryPhoneNumber = getPhoneNumberFromCustomer(customer);
  let apportioningItems: ApportioningInterface[] = [];
  const accountId: AccountIdInterface = {
    phoneNumber: {
      phoneNumber: primaryPhoneNumber,
      sequenceNumber: 0
    }, uuid: customer.accountUuid
  }
  apportioningItems.push(
    {
      accountId,
      amount: depositRequirements.requiredDeposit,
      reason: {
        type: isBusiness ? "DEPOSIT_FEE_FOR_INITIAL_BUSINESS" : "DEPOSIT_FEE_FOR_INITIAL_RESIDENT"
      }
    }
  )
  for (let backBalance of depositRequirements.backBalances) {
    const apportioning: ApportioningInterface = {
      accountId,
      amount: backBalance.amountDue,
      reason: {
        type: "UNPAID_FINAL_BALANCE"
      },
    }
    apportioningItems.push(apportioning);
  }
  return apportioningItems;

};


export const getTotalPayment = (depositRequirements: DepositResponse): number => {
  let sum = depositRequirements.requiredDeposit;
  if (!depositRequirements.backBalances) {
    return sum;
  }
  for (const deposit of depositRequirements.backBalances) {
    sum += deposit.amountDue;
  }
  return sum;
};
