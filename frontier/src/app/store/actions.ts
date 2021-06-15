import { createAction, props } from '@ngrx/store';

export const setUserAction = createAction('setUserAction', props<any>());
export const logoutAction = createAction('logoutAction');