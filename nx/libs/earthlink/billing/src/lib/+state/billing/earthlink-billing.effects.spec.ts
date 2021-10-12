import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as EarthlinkBillingActions from './earthlink-billing.actions';
import { EarthlinkBillingEffects } from './earthlink-billing.effects';

describe('EarthlinkBillingEffects', () => {
  let actions: Observable<Action>;
  let effects: EarthlinkBillingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EarthlinkBillingEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(EarthlinkBillingEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EarthlinkBillingActions.init() });

      const expected = hot('-a-|', {
        a: EarthlinkBillingActions.loadEarthlinkBillingSuccess({
          earthlinkBilling: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
