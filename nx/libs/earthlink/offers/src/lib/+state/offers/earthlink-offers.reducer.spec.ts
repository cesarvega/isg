import { Action } from '@ngrx/store';

import * as EarthlinkOffersActions from './earthlink-offers.actions';
import { EarthlinkOffersEntity } from './earthlink-offers.models';
import { State, initialState, reducer } from './earthlink-offers.reducer';

describe('EarthlinkOffers Reducer', () => {
  const createEarthlinkOffersEntity = (
    id: string,
    name = ''
  ): EarthlinkOffersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid EarthlinkOffers actions', () => {
    it('loadEarthlinkOffersSuccess should return the list of known EarthlinkOffers', () => {
      const earthlinkOffers = [
        createEarthlinkOffersEntity('PRODUCT-AAA'),
        createEarthlinkOffersEntity('PRODUCT-zzz'),
      ];
      const action = EarthlinkOffersActions.loadEarthlinkOffersSuccess({
        earthlinkOffers,
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
