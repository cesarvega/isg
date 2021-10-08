import { Action } from '@ngrx/store';

import * as EarthlinkAddressActions from './earthlink-address.actions';
import { EarthlinkAddressEntity } from './earthlink-address.models';
import { State, initialState, reducer } from './earthlink-address.reducer';

describe('EarthlinkAddress Reducer', () => {
  const createEarthlinkAddressEntity = (
    id: string,
    name = ''
  ): EarthlinkAddressEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid EarthlinkAddress actions', () => {
    it('loadEarthlinkAddressSuccess should return the list of known EarthlinkAddress', () => {
      const earthlinkAddress = [
        createEarthlinkAddressEntity('PRODUCT-AAA'),
        createEarthlinkAddressEntity('PRODUCT-zzz'),
      ];
      const action = EarthlinkAddressActions.loadEarthlinkAddressSuccess({
        earthlinkAddress,
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
