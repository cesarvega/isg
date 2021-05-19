import { createReducer, on } from '@ngrx/store';
import { setUserAction, logoutAction } from './actions';
import { UserInterface } from '../frontier/interfaces/user-interface';
import { RootInterface } from '../interfaces/root-interface';



export const initialState: RootInterface = {
  user: null,
};

const _counterReducer = createReducer(
  initialState,
  on(setUserAction, (state, user) => ({ ...state, user })),
  on(logoutAction, (state) => ({ ...state, user: null })),
);

export function RootReducer(state, action) {
  return _counterReducer(state, action);
}