import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EarthlinkOffersActions from './earthlink-offers.actions';
import * as EarthlinkOffersFeature from './earthlink-offers.reducer';

@Injectable()
export class EarthlinkOffersEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EarthlinkOffersActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EarthlinkOffersActions.loadEarthlinkOffersSuccess({
            earthlinkOffers: [],
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EarthlinkOffersActions.loadEarthlinkOffersFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
