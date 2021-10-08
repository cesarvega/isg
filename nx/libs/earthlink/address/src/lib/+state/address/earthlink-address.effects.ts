import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EarthlinkAddressActions from './earthlink-address.actions';
import * as EarthlinkAddressFeature from './earthlink-address.reducer';

@Injectable()
export class EarthlinkAddressEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EarthlinkAddressActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EarthlinkAddressActions.loadEarthlinkAddressSuccess({
            response: ['my address'],
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EarthlinkAddressActions.loadEarthlinkAddressFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
