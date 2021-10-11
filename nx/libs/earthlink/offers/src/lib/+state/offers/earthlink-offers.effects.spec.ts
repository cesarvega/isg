import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as EarthlinkOffersActions from './earthlink-offers.actions';
import { EarthlinkOffersEffects } from './earthlink-offers.effects';

describe('EarthlinkOffersEffects', () => {
  let actions: Observable<Action>;
  let effects: EarthlinkOffersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EarthlinkOffersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(EarthlinkOffersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EarthlinkOffersActions.init() });

      const expected = hot('-a-|', {
        a: EarthlinkOffersActions.loadEarthlinkOffersSuccess({
          earthlinkOffers: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
