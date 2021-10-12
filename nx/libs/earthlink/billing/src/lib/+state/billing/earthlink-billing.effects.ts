import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EarthlinkBillingActions from './earthlink-billing.actions';
import * as EarthlinkBillingFeature from './earthlink-billing.reducer';

@Injectable()
export class EarthlinkBillingEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EarthlinkBillingActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EarthlinkBillingActions.loadEarthlinkBillingSuccess({
            earthlinkBilling: [],
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EarthlinkBillingActions.loadEarthlinkBillingFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
