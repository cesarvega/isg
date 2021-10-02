import { createAction, props } from '@ngrx/store';
import { Address } from '../../containers/address/interfaces/address';

export const addressRequest = createAction(
    'addressRequest',
    props<{ uuid: any }>()
)

export const errorAction = createAction(
    'errorAction',
    props<{ error: any }>()
)