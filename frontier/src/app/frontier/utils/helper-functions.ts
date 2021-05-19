import { ErrorInterface } from '../interfaces/error-interface';
export function parseHttperror(error) {
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
        }
    }
    else {
        return { message: error.message, errors: [] }
    }
}