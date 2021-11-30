import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as RepublicwRegisterActions from './republicw-register.actions';
import { RepublicwRegisterEffects } from './republicw-register.effects';

describe('RepublicwRegisterEffects', () => {
  let actions: Observable<Action>;
  let effects: RepublicwRegisterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        RepublicwRegisterEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(RepublicwRegisterEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RepublicwRegisterActions.init() });

      const expected = hot('-a-|', {
        a: RepublicwRegisterActions.loadRepublicwRegisterSuccess({
          republicwRegister: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
