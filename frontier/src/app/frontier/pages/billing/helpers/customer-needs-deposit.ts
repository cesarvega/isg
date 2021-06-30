import { DepositResponse } from "../payment/interfaces/deposit-requirements-response.interface"


export const customerNeedsDepositHelper = (depositRequirements: DepositResponse) => {
    return depositRequirements.requiredDeposit > 0
}