import { HttpErrorResponse } from '@angular/common/http';
import { ErrorInterface } from './services/interfaces/common/error-interface'
export function parseHttperror(error: HttpErrorResponse) {
  if (error.status == 422) {
    let parsedError = error.error;
    if (parsedError.errors) {
      let fixedErrors = Object.values(parsedError.errors);
      fixedErrors = fixedErrors.map((error) => {
        return error[0]
      })
      let errorInterface: ErrorInterface = {
        errors: fixedErrors,
        message: parsedError.message
      }
      return errorInterface;
    } else {
      let errorInterface: ErrorInterface = {
        errors: [],
        message: parsedError.message
      }
      return errorInterface;
    }
  }
  else {
    return { message: error.error, errors: [] }
  }
}
