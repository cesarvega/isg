import { Observable } from 'rxjs';
export function getValueFromState(data: Observable<any>) {
  let returnValue = null;
  data.subscribe((value) => {
    returnValue = value;
  }).unsubscribe()
  return returnValue;
}
