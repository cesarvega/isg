import { EarthlinkAddressEntity } from './earthlink-address.models';
import {
  earthlinkAddressAdapter,
  EarthlinkAddressPartialState,
  initialState,
} from './earthlink-address.reducer';
import * as EarthlinkAddressSelectors from './earthlink-address.selectors';

describe('EarthlinkAddress Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEarthlinkAddressId = (it: EarthlinkAddressEntity) => it.id;
  const createEarthlinkAddressEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EarthlinkAddressEntity);

  let state: EarthlinkAddressPartialState;

  beforeEach(() => {
    state = {
      earthlinkAddress: earthlinkAddressAdapter.setAll(
        [
          createEarthlinkAddressEntity('PRODUCT-AAA'),
          createEarthlinkAddressEntity('PRODUCT-BBB'),
          createEarthlinkAddressEntity('PRODUCT-CCC'),
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

  describe('EarthlinkAddress Selectors', () => {
    it('getAllEarthlinkAddress() should return the list of EarthlinkAddress', () => {
      const results = EarthlinkAddressSelectors.getAllEarthlinkAddress(state);
      const selId = getEarthlinkAddressId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EarthlinkAddressSelectors.getSelected(
        state
      ) as EarthlinkAddressEntity;
      const selId = getEarthlinkAddressId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getEarthlinkAddressLoaded() should return the current "loaded" status', () => {
      const result = EarthlinkAddressSelectors.getEarthlinkAddressLoaded(state);

      expect(result).toBe(true);
    });

    it('getEarthlinkAddressError() should return the current "error" state', () => {
      const result = EarthlinkAddressSelectors.getEarthlinkAddressError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
