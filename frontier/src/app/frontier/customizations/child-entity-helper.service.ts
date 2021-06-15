import { Injectable } from '@angular/core';
import { ChildEntity } from '../store/interfaces/quote';

@Injectable({
  providedIn: 'root'
})
export class ChildEntityHelperService {

  constructor() { }


  isCustomizationCompleteFunctional(childEntity: ChildEntity) {
    if (!childEntity.ChildEntity)
      return true
    return this.areChildrenActive(childEntity) >= childEntity.minimumActiveChildEntities
  }



  areChildrenActive(childEntity: ChildEntity) {
    let counter = 0;
    for (let iterateChildEntity of childEntity.ChildEntity) {
      if (iterateChildEntity.hasOwnProperty("Active")) {
        if (iterateChildEntity.Active)
          counter++
      } else {
        counter += this.isCustomizationCompleteFunctional(iterateChildEntity) ? 1 : 0
      }
    }
    return counter;
  }
}
