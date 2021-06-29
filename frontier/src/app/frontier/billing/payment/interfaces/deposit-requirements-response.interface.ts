import {PhoneNumberInterface} from './deposit-request.interface';

export interface DepositResponse {
  backBalances: BackBalances[];
  requiredDeposit: number;
}

export interface BackBalances {
  accountId: AccountId;
  amountDue: number;
}

export interface AccountId{
  phoneNumber: PhoneNumberInterface;
  usi: string;
}



