export interface DepositRequestInterface {
    lineOfBusiness: string,
    payment: PaymentInterface,
    emailAddress: string,
    apportioning: ApportioningInterface[]
}

export interface PaymentInterface {
    name: string,
    fundingAccountToken: string,
    addFundingAccountTokenToWallet: boolean,
    paymentMethod: string,
    total: number,
    note: string,
}

export interface ApportioningInterface {
    accountId: AccountIdInterface,
    amount: number,
    reason: ReasonInterface
}

export interface AccountIdInterface {
    phoneNumber: PhoneNumberInterface,
}
export interface PhoneNumberInterface {
    phoneNumber: string,
    sequenceNumber: string,
}

export interface ReasonInterface {
    type: string,
}