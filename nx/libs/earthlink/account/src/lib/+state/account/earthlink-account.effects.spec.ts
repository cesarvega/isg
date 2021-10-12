import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as EarthlinkAccountActions from './earthlink-account.actions';
import { EarthlinkAccountEffects } from './earthlink-account.effects';

describe('EarthlinkAccountEffects', () => {
  let actions: Observable<Action>;
  let effects: EarthlinkAccountEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EarthlinkAccountEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(EarthlinkAccountEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EarthlinkAccountActions.init() });

      const expected = hot('-a-|', {
        a: EarthlinkAccountActions.loadEarthlinkAccountSuccess({
          earthlinkAccount: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
