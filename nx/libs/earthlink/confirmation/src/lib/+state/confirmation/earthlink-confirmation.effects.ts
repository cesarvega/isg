import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EarthlinkConfirmationActions from './earthlink-confirmation.actions';
import * as EarthlinkConfirmationFeature from './earthlink-confirmation.reducer';

@Injectable()
export class EarthlinkConfirmationEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EarthlinkConfirmationActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EarthlinkConfirmationActions.loadEarthlinkConfirmationSuccess({
            earthlinkConfirmation: [],
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EarthlinkConfirmationActions.loadEarthlinkConfirmationFailure({
            error,
          });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
