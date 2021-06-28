import { CustomerInterface } from "src/app/frontier/services/interfaces/customer/customer";
import { GenerateTokenRequestInterface } from "../interfaces/generate-token-request.interface";
import { PaymentFormInterface } from "../interfaces/payment.form.interface";

export const buildRequestGeneratePaymentToken = (paymentForm: PaymentFormInterface
  , lineOfBusiness: string, CorrelationId: string): GenerateTokenRequestInterface => {
  let requestForm: GenerateTokenRequestInterface = {
    ...paymentForm,
    lineOfBusiness,
    CorrelationId,
  }
  return requestForm;
}
