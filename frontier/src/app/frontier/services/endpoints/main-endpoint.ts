export class MainEndpoint {
  private modulePredix = 'frontier'
  private apiViersion = 'v1'

  protected buildURL(endpoint) {
    return `${this.modulePredix}/${this.apiViersion}/${endpoint}`
  }
}

