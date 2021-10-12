import { Action } from '@ngrx/store';

import * as EarthlinkConfirmationActions from './earthlink-confirmation.actions';
import { EarthlinkConfirmationEntity } from './earthlink-confirmation.models';
import { State, initialState, reducer } from './earthlink-confirmation.reducer';

describe('EarthlinkConfirmation Reducer', () => {
  const createEarthlinkConfirmationEntity = (
    id: string,
    name = ''
  ): EarthlinkConfirmationEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid EarthlinkConfirmation actions', () => {
    it('loadEarthlinkConfirmationSuccess should return the list of known EarthlinkConfirmation', () => {
      const earthlinkConfirmation = [
        createEarthlinkConfirmationEntity('PRODUCT-AAA'),
        createEarthlinkConfirmationEntity('PRODUCT-zzz'),
      ];
      const action =
        EarthlinkConfirmationActions.loadEarthlinkConfirmationSuccess({
          earthlinkConfirmation,
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
