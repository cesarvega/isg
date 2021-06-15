import { MainEndpoint } from "./main-endpoint";

export class DisclosureEndpoints extends MainEndpoint {

  private disclosuresEndPoint = "disclosures"

  getDisclosuresEndpoint(quoteId) {
    let params = "/:quoteId";
    let endpoint = this.disclosuresEndPoint + params;
    endpoint = endpoint.replace(":quoteId", quoteId);
    return this.buildURL(endpoint);
  }
}
