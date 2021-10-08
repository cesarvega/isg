import { EmailValidator } from "@angular/forms";
import { ObjectUnsubscribedError } from "rxjs";
import { Address } from "../interfaces/address"

export const buildAddressFromParams = (params: any): Address => {
    const { address_line1, address_line2, city, state, zip, first_name, last_name, email, phone, is_business, alt_phone, error, uuid, reset } = params;
    return {
        AddressLine1: address_line1,
        AddressLine2: address_line2,
        City: city,
        State: state,
        Zip: { ZipCode: zip },
        FirtstName: first_name,
        LastName: last_name,
        Email: email,
        Phone: phone,
        IsBusiness: is_business,
        AltPhone: alt_phone,
        Error: error,
        Uuid: uuid,
        Reset: reset
    }
}