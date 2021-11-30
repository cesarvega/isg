import { RepublicwRegisterEntity } from './republicw-register.models';
import {
  republicwRegisterAdapter,
  RepublicwRegisterPartialState,
  initialState,
} from './republicw-register.reducer';
import * as RepublicwRegisterSelectors from './republicw-register.selectors';

describe('RepublicwRegister Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRepublicwRegisterId = (it: RepublicwRegisterEntity) => it.id;
  const createRepublicwRegisterEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RepublicwRegisterEntity);

  let state: RepublicwRegisterPartialState;

  beforeEach(() => {
    state = {
      republicwRegister: republicwRegisterAdapter.setAll(
        [
          createRepublicwRegisterEntity('PRODUCT-AAA'),
          createRepublicwRegisterEntity('PRODUCT-BBB'),
          createRepublicwRegisterEntity('PRODUCT-CCC'),
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

  describe('RepublicwRegister Selectors', () => {
    it('getAllRepublicwRegister() should return the list of RepublicwRegister', () => {
      const results = RepublicwRegisterSelectors.getAllRepublicwRegister(state);
      const selId = getRepublicwRegisterId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = RepublicwRegisterSelectors.getSelected(
        state
      ) as RepublicwRegisterEntity;
      const selId = getRepublicwRegisterId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getRepublicwRegisterLoaded() should return the current "loaded" status', () => {
      const result =
        RepublicwRegisterSelectors.getRepublicwRegisterLoaded(state);

      expect(result).toBe(true);
    });

    it('getRepublicwRegisterError() should return the current "error" state', () => {
      const result =
        RepublicwRegisterSelectors.getRepublicwRegisterError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
