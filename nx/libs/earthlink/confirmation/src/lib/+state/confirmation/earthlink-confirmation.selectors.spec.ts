import { EarthlinkConfirmationEntity } from './earthlink-confirmation.models';
import {
  earthlinkConfirmationAdapter,
  EarthlinkConfirmationPartialState,
  initialState,
} from './earthlink-confirmation.reducer';
import * as EarthlinkConfirmationSelectors from './earthlink-confirmation.selectors';

describe('EarthlinkConfirmation Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEarthlinkConfirmationId = (it: EarthlinkConfirmationEntity) => it.id;
  const createEarthlinkConfirmationEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EarthlinkConfirmationEntity);

  let state: EarthlinkConfirmationPartialState;

  beforeEach(() => {
    state = {
      earthlinkConfirmation: earthlinkConfirmationAdapter.setAll(
        [
          createEarthlinkConfirmationEntity('PRODUCT-AAA'),
          createEarthlinkConfirmationEntity('PRODUCT-BBB'),
          createEarthlinkConfirmationEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('EarthlinkConfirmation Selectors', () => {
    it('getAllEarthlinkConfirmation() should return the list of EarthlinkConfirmation', () => {
      const results =
        EarthlinkConfirmationSelectors.getAllEarthlinkConfirmation(state);
      const selId = getEarthlinkConfirmationId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EarthlinkConfirmationSelectors.getSelected(
        state
      ) as EarthlinkConfirmationEntity;
      const selId = getEarthlinkConfirmationId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getEarthlinkConfirmationLoaded() should return the current "loaded" status', () => {
      const result =
        EarthlinkConfirmationSelectors.getEarthlinkConfirmationLoaded(state);

      expect(result).toBe(true);
    });

    it('getEarthlinkConfirmationError() should return the current "error" state', () => {
      const result =
        EarthlinkConfirmationSelectors.getEarthlinkConfirmationError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
