import { Action } from '@ngrx/store';

import * as EarthlinkAccountActions from './earthlink-account.actions';
import { EarthlinkAccountEntity } from './earthlink-account.models';
import { State, initialState, reducer } from './earthlink-account.reducer';

describe('EarthlinkAccount Reducer', () => {
  const createEarthlinkAccountEntity = (
    id: string,
    name = ''
  ): EarthlinkAccountEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid EarthlinkAccount actions', () => {
    it('loadEarthlinkAccountSuccess should return the list of known EarthlinkAccount', () => {
      const earthlinkAccount = [
        createEarthlinkAccountEntity('PRODUCT-AAA'),
        createEarthlinkAccountEntity('PRODUCT-zzz'),
      ];
      const action = EarthlinkAccountActions.loadEarthlinkAccountSuccess({
        earthlinkAccount,
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
