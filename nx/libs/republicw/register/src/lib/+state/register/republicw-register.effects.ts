import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as RepublicwRegisterActions from './republicw-register.actions';
import * as RepublicwRegisterFeature from './republicw-register.reducer';

@Injectable()
export class RepublicwRegisterEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepublicwRegisterActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return RepublicwRegisterActions.loadRepublicwRegisterSuccess({
            republicwRegister: [],
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RepublicwRegisterActions.loadRepublicwRegisterFailure({
            error,
          });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
