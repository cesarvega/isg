import { Action } from '@ngrx/store';

import * as EarthlinkBillingActions from './earthlink-billing.actions';
import { EarthlinkBillingEntity } from './earthlink-billing.models';
import { State, initialState, reducer } from './earthlink-billing.reducer';

describe('EarthlinkBilling Reducer', () => {
  const createEarthlinkBillingEntity = (
    id: string,
    name = ''
  ): EarthlinkBillingEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid EarthlinkBilling actions', () => {
    it('loadEarthlinkBillingSuccess should return the list of known EarthlinkBilling', () => {
      const earthlinkBilling = [
        createEarthlinkBillingEntity('PRODUCT-AAA'),
        createEarthlinkBillingEntity('PRODUCT-zzz'),
      ];
      const action = EarthlinkBillingActions.loadEarthlinkBillingSuccess({
        earthlinkBilling,
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
