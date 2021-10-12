import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EarthlinkAccountActions from './earthlink-account.actions';
import * as EarthlinkAccountFeature from './earthlink-account.reducer';

@Injectable()
export class EarthlinkAccountEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EarthlinkAccountActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EarthlinkAccountActions.loadEarthlinkAccountSuccess({
            earthlinkAccount: [],
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EarthlinkAccountActions.loadEarthlinkAccountFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
