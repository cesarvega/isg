export interface GenerateTokenRequestInterface {
    CorrelationId: string,
    customerType: string,
    firstName,
    lastName,
    lineOfBusiness: string,
    cardNumber: string,
    expirationDate: string,
    nameOnCard: string,
    securityCode: string,
    zipCode: string
}