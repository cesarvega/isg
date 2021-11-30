import { createAction, props } from '@ngrx/store';
import { RepublicwRegisterEntity } from './republicw-register.models';

export const init = createAction('[RepublicwRegister Page] Init');

export const loadRepublicwRegisterSuccess = createAction(
  '[RepublicwRegister/API] Load RepublicwRegister Success',
  props<{ republicwRegister: RepublicwRegisterEntity[] }>()
);

export const loadRepublicwRegisterFailure = createAction(
  '[RepublicwRegister/API] Load RepublicwRegister Failure',
  props<{ error: any }>()
);

export const register = createAction(
  'register'
)
