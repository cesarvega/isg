import { MainEndpoint } from "./main-endpoint";

export class DepositEndpoints extends MainEndpoint {

  private despositRequirementsEndpoint  = "billing/deposit-requirements"
  private depositEndpoint =  "billing/deposit/:quoteId";
  private generatePaymentTokenEndpoint = "billing/generatePaymentToken/:quoteId";

  getDepositRequirementEndpoint() {
    return this.buildURL(this.despositRequirementsEndpoint);
  }

  getDepositEndpoint(quoteId) {
    let endpoint = this.depositEndpoint.replace(":quoteId",quoteId);
    return this.buildURL(endpoint);
  }

  getGeneratePaymentTokenEndpoint(quoteId) {
    let endpoint = this.generatePaymentTokenEndpoint.replace(":quoteId",quoteId);
    return this.buildURL(endpoint);
  }
}
