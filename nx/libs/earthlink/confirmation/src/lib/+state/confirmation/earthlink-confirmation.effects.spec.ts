import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as EarthlinkConfirmationActions from './earthlink-confirmation.actions';
import { EarthlinkConfirmationEffects } from './earthlink-confirmation.effects';

describe('EarthlinkConfirmationEffects', () => {
  let actions: Observable<Action>;
  let effects: EarthlinkConfirmationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EarthlinkConfirmationEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(EarthlinkConfirmationEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EarthlinkConfirmationActions.init() });

      const expected = hot('-a-|', {
        a: EarthlinkConfirmationActions.loadEarthlinkConfirmationSuccess({
          earthlinkConfirmation: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
