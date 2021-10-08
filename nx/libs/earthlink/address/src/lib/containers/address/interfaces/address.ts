export interface Address {
    AddressLine1?: string,
    AddressLine2?: string,
    City?: string,
    State?: string,
    Zip?: Zip,
    FirtstName?: string,
    LastName?: string,
    Email?: string,
    Phone?: string,
    IsBusiness?: boolean,
    AltPhone?: string,
    Uuid?: string,
    Error?: any,
    Reset?: boolean
}

interface Zip {
    ZipCode: string,
}