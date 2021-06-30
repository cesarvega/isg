import { MainEndpoint } from "src/app/frontier/utils/services/endpoints/main-endpoint";

export class BillingEndpoints extends MainEndpoint {

  private billPreviewEndpoint = "billing/preview"

  getBillPreviewEndpoint() {
    return this.buildURL(this.billPreviewEndpoint);
  }
}
