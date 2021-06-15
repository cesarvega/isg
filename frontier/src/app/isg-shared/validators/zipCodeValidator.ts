import {AbstractControl, ValidatorFn} from '@angular/forms';
export function zipCodeValidator(): ValidatorFn {
    let zipCodeRegex: RegExp = /^\d{5}(?:[-\s]\d{4})?$/;
    return (control: AbstractControl): {[key: string]: any} | null => {
      const expressionMatched = zipCodeRegex.test(control.value);
      return expressionMatched ? null : {forbiddenName: {value: control.value}};
    };
  }