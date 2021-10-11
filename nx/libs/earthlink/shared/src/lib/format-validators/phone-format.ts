import { AbstractControl } from "@angular/forms";
const phoneNumRegex = /[^-?(\d{3})(\-\d{3})(\-\d{4})]/;

export function validatePhoneNumber( control: AbstractControl ){
    if( control.value.match( phoneNumRegex ) ){
        return { validNum: true }
    }
    return null;
}