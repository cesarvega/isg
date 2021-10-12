import { createAction, props } from '@ngrx/store';
import { EarthlinkOffersEntity } from './earthlink-offers.models';

export const init = createAction('[EarthlinkOffers Page] Init');

export const loadEarthlinkOffersSuccess = createAction(
  '[EarthlinkOffers/API] Load EarthlinkOffers Success',
  props<{ earthlinkOffers: EarthlinkOffersEntity[] }>()
);

export const loadEarthlinkOffersFailure = createAction(
  '[EarthlinkOffers/API] Load EarthlinkOffers Failure',
  props<{ error: any }>()
);

export const productsActionRequest = createAction(
  'productsActionRequest',
  props< { products: any }>()
)

export const productIdsActionRequest = createAction(
  'productIdsActionRequest',
  props< { ids: any }>()
)
