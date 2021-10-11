import { EarthlinkOffersEntity } from './earthlink-offers.models';
import {
  earthlinkOffersAdapter,
  EarthlinkOffersPartialState,
  initialState,
} from './earthlink-offers.reducer';
import * as EarthlinkOffersSelectors from './earthlink-offers.selectors';

describe('EarthlinkOffers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEarthlinkOffersId = (it: EarthlinkOffersEntity) => it.id;
  const createEarthlinkOffersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EarthlinkOffersEntity);

  let state: EarthlinkOffersPartialState;

  beforeEach(() => {
    state = {
      earthlinkOffers: earthlinkOffersAdapter.setAll(
        [
          createEarthlinkOffersEntity('PRODUCT-AAA'),
          createEarthlinkOffersEntity('PRODUCT-BBB'),
          createEarthlinkOffersEntity('PRODUCT-CCC'),
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

  describe('EarthlinkOffers Selectors', () => {
    it('getAllEarthlinkOffers() should return the list of EarthlinkOffers', () => {
      const results = EarthlinkOffersSelectors.getAllEarthlinkOffers(state);
      const selId = getEarthlinkOffersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EarthlinkOffersSelectors.getSelected(
        state
      ) as EarthlinkOffersEntity;
      const selId = getEarthlinkOffersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getEarthlinkOffersLoaded() should return the current "loaded" status', () => {
      const result = EarthlinkOffersSelectors.getEarthlinkOffersLoaded(state);

      expect(result).toBe(true);
    });

    it('getEarthlinkOffersError() should return the current "error" state', () => {
      const result = EarthlinkOffersSelectors.getEarthlinkOffersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
