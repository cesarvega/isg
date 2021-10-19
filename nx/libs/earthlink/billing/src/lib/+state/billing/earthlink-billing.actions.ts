import { createAction, props } from '@ngrx/store';
import { EarthlinkBillingEntity } from './earthlink-billing.models';
import { iPayment } from '../../interfaces/payment';

export const init = createAction('[EarthlinkBilling Page] Init');

export const loadEarthlinkBillingSuccess = createAction(
  '[EarthlinkBilling/API] Load EarthlinkBilling Success',
  props<{ earthlinkBilling: EarthlinkBillingEntity[] }>()
);

export const loadEarthlinkBillingFailure = createAction(
  '[EarthlinkBilling/API] Load EarthlinkBilling Failure',
  props<{ error: any }>()
);

export const makeApayment = createAction(
  'makeApaymentRequest',
  props<{ payment: any }>()
);

export const errorPayment = createAction(
  'error',
  props<{ error: any }>()
);

export const paymentSuccess = createAction(
  'paymentSuccess',
  props<{  payment: iPayment }>()
)
