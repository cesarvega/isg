import { createAction, props } from '@ngrx/store';
import { EarthlinkBillingEntity } from './earthlink-billing.models';

export const init = createAction('[EarthlinkBilling Page] Init');

export const loadEarthlinkBillingSuccess = createAction(
  '[EarthlinkBilling/API] Load EarthlinkBilling Success',
  props<{ earthlinkBilling: EarthlinkBillingEntity[] }>()
);

export const loadEarthlinkBillingFailure = createAction(
  '[EarthlinkBilling/API] Load EarthlinkBilling Failure',
  props<{ error: any }>()
);
