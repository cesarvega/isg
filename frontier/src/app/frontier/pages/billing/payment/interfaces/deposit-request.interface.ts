export interface DepositRequestInterface {
    accountId?: AccountIdInterface,
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
    reason: ReasonInterface,
}

export interface AccountIdInterface {
    phoneNumber: PhoneNumberInterface,
    uuid: string
}
export interface PhoneNumberInterface {
    phoneNumber: number,
    sequenceNumber: number,
}

export interface ReasonInterface {
    type: string,
}
