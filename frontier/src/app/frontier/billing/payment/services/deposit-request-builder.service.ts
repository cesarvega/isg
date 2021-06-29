import {DepositResponse} from '../interfaces/deposit-requirements-response.interface';
import {PaymentFormInterface} from '../interfaces/payment.form.interface';
import {ApportioningInterface, DepositRequestInterface} from '../interfaces/deposit-request.interface';
import {lineOfBusiness} from '../utils/line-of-business';

export const buildDepositCollectionRequest = (depositRequirements: DepositResponse, fundingAccountToken: string, payment: PaymentFormInterface, emailAddress) => {
  const paymentMethod = 'ONE_TIME_ACH';
  const note = 'Wallet Payment';
  const request: DepositRequestInterface = {
    lineOfBusiness,
    apportioning: buildApportioning(depositRequirements),
    emailAddress,
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

const buildApportioning = (depositRequirements: DepositResponse): ApportioningInterface[] => {
  return depositRequirements.backBalances.map((backBalance) => {
    return {
      accountId : backBalance.accountId,
      amount: backBalance.amountDue,
      reason: {
        type: 'DEPOSIT_FEE_FOR_INITIAL_RESIDENT',
      }
    };
  });
};


const getTotalPayment = (depositRequirements: DepositResponse): number => {
  let sum = 0;
  for (const deposit of depositRequirements.backBalances){
    sum += deposit.amountDue;
  }
  return sum;
};
