import { MainEndpoint } from "./main-endpoint";

export class DepositEndpoints extends MainEndpoint {

  private despositRequirementsEndpoint  = "billing/deposit-requirements"
  private depositEndpoint =  "billing/deposit/:quoteId";
  private generatePaymentTokenEndpoint = "billing/generate-payment-token/:accountUUID";

  getDepositRequirementEndpoint() {
    return this.buildURL(this.despositRequirementsEndpoint);
  }

  getDepositEndpoint(quoteId) {
    let endpoint = this.depositEndpoint.replace(":quoteId",quoteId);
    return this.buildURL(endpoint);
  }

  getGeneratePaymentTokenEndpoint(accountUUID) {
    let endpoint = this.generatePaymentTokenEndpoint.replace(":accountUUID",accountUUID);
    return this.buildURL(endpoint);
  }
}
