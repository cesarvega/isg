import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeCustomization, setCustomization } from 'src/app/frontier/utils/store/actions';
import { ChildEntity } from 'src/app/frontier/utils/store/interfaces/quote';

@Injectable({
  providedIn: 'root'
})
export class ChildEntityService {

  constructor(private store: Store<any>) { }

  selectCustomization(customization: ChildEntity) {
    customization.Active = true;
    this.store.dispatch(setCustomization({ customization }));
  }

  removeCustomization(customization: ChildEntity) {
    customization.Active = false;
    this.store.dispatch(removeCustomization({ customization }));
  }
}
