import { PaymentFormInterface } from "../interfaces/payment.form.interface";

const testResidential: PaymentFormInterface = {
    alias: "Test Residential",
    customerType: "RESIDENTIAL",
    cardNumber: '4100010000001800',
    firstName: 'Test',
    lastName: 'lunkad',
    expirationDate: '09/30',
    nameOnCard: 'VL',
    securityCode: '998',
    zipCode: '12045'
};

export const paymentTestCases: ReadonlyArray<PaymentFormInterface> = [
    testResidential
]
