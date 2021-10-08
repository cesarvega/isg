import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as EarthlinkAddressActions from './earthlink-address.actions';
import { EarthlinkAddressEffects } from './earthlink-address.effects';

describe('EarthlinkAddressEffects', () => {
  let actions: Observable<Action>;
  let effects: EarthlinkAddressEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EarthlinkAddressEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(EarthlinkAddressEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EarthlinkAddressActions.init() });

      const expected = hot('-a-|', {
        a: EarthlinkAddressActions.loadEarthlinkAddressSuccess({
          earthlinkAddress: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
