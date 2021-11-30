import { Action } from '@ngrx/store';

import * as RepublicwRegisterActions from './republicw-register.actions';
import { RepublicwRegisterEntity } from './republicw-register.models';
import { State, initialState, reducer } from './republicw-register.reducer';

describe('RepublicwRegister Reducer', () => {
  const createRepublicwRegisterEntity = (
    id: string,
    name = ''
  ): RepublicwRegisterEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid RepublicwRegister actions', () => {
    it('loadRepublicwRegisterSuccess should return the list of known RepublicwRegister', () => {
      const republicwRegister = [
        createRepublicwRegisterEntity('PRODUCT-AAA'),
        createRepublicwRegisterEntity('PRODUCT-zzz'),
      ];
      const action = RepublicwRegisterActions.loadRepublicwRegisterSuccess({
        republicwRegister,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
