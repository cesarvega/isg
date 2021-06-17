export interface GenerateTokenRequestInterface {
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