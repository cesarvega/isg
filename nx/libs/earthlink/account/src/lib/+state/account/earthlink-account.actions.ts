import { createAction, props } from '@ngrx/store';
import { EarthlinkAccountEntity } from './earthlink-account.models';

export const init = createAction('[EarthlinkAccount Page] Init');

export const loadEarthlinkAccountSuccess = createAction(
  '[EarthlinkAccount/API] Load EarthlinkAccount Success',
  props<{ earthlinkAccount: EarthlinkAccountEntity[] }>()
);

export const loadEarthlinkAccountFailure = createAction(
  '[EarthlinkAccount/API] Load EarthlinkAccount Failure',
  props<{ error: any }>()
);
