import { EarthlinkAccountEntity } from './earthlink-account.models';
import {
  earthlinkAccountAdapter,
  EarthlinkAccountPartialState,
  initialState,
} from './earthlink-account.reducer';
import * as EarthlinkAccountSelectors from './earthlink-account.selectors';

describe('EarthlinkAccount Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEarthlinkAccountId = (it: EarthlinkAccountEntity) => it.id;
  const createEarthlinkAccountEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EarthlinkAccountEntity);

  let state: EarthlinkAccountPartialState;

  beforeEach(() => {
    state = {
      earthlinkAccount: earthlinkAccountAdapter.setAll(
        [
          createEarthlinkAccountEntity('PRODUCT-AAA'),
          createEarthlinkAccountEntity('PRODUCT-BBB'),
          createEarthlinkAccountEntity('PRODUCT-CCC'),
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

  describe('EarthlinkAccount Selectors', () => {
    it('getCurrentAccount() should return the list of EarthlinkAccount', () => {
      const results = EarthlinkAccountSelectors.getCurrentAccount(state);
      const selId = getEarthlinkAccountId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EarthlinkAccountSelectors.getSelected(
        state
      ) as EarthlinkAccountEntity;
      const selId = getEarthlinkAccountId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getEarthlinkAccountLoaded() should return the current "loaded" status', () => {
      const result = EarthlinkAccountSelectors.getEarthlinkAccountLoaded(state);

      expect(result).toBe(true);
    });

    it('getEarthlinkAccountError() should return the current "error" state', () => {
      const result = EarthlinkAccountSelectors.getEarthlinkAccountError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
