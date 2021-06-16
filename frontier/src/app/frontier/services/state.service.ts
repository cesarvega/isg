import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Frontier } from '../store/interfaces/app.state';
import { selectQuoteId, selectFrontier } from '../store/selectors';
import { getValueFromState } from '../utils/get-value-from-state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private store: Store<any>) {

  }

  isTaskClosed(taskId){
    return this.getFrontierState().closedTasks.find((closedTaskId)=>{
      return taskId == closedTaskId
    }) 
  }

  getFrontierState(): Frontier {
    return this.getValueFromSelector(selectFrontier)
  }


  getState() {
    return getValueFromState(this.store)
  }

  getQuoteId() {
    return getValueFromState(this.store.select(selectQuoteId))
  }

  getValueFromSelector(selector) {
    return getValueFromState(this.store.select(selector))
  }

  dispatchAction(action) {
    this.store.dispatch(action)
  }



}
