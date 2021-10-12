import { EarthlinkBillingEntity } from './earthlink-billing.models';
import {
  earthlinkBillingAdapter,
  EarthlinkBillingPartialState,
  initialState,
} from './earthlink-billing.reducer';
import * as EarthlinkBillingSelectors from './earthlink-billing.selectors';

describe('EarthlinkBilling Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEarthlinkBillingId = (it: EarthlinkBillingEntity) => it.id;
  const createEarthlinkBillingEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EarthlinkBillingEntity);

  let state: EarthlinkBillingPartialState;

  beforeEach(() => {
    state = {
      earthlinkBilling: earthlinkBillingAdapter.setAll(
        [
          createEarthlinkBillingEntity('PRODUCT-AAA'),
          createEarthlinkBillingEntity('PRODUCT-BBB'),
          createEarthlinkBillingEntity('PRODUCT-CCC'),
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

  describe('EarthlinkBilling Selectors', () => {
    it('getAllEarthlinkBilling() should return the list of EarthlinkBilling', () => {
      const results = EarthlinkBillingSelectors.getAllEarthlinkBilling(state);
      const selId = getEarthlinkBillingId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EarthlinkBillingSelectors.getSelected(
        state
      ) as EarthlinkBillingEntity;
      const selId = getEarthlinkBillingId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getEarthlinkBillingLoaded() should return the current "loaded" status', () => {
      const result = EarthlinkBillingSelectors.getEarthlinkBillingLoaded(state);

      expect(result).toBe(true);
    });

    it('getEarthlinkBillingError() should return the current "error" state', () => {
      const result = EarthlinkBillingSelectors.getEarthlinkBillingError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
