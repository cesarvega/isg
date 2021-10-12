import { createAction, props } from '@ngrx/store';
import { EarthlinkConfirmationEntity } from './earthlink-confirmation.models';

export const init = createAction('[EarthlinkConfirmation Page] Init');

export const loadEarthlinkConfirmationSuccess = createAction(
  '[EarthlinkConfirmation/API] Load EarthlinkConfirmation Success',
  props<{ earthlinkConfirmation: EarthlinkConfirmationEntity[] }>()
);

export const loadEarthlinkConfirmationFailure = createAction(
  '[EarthlinkConfirmation/API] Load EarthlinkConfirmation Failure',
  props<{ error: any }>()
);
