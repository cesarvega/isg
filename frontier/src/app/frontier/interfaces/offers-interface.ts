export interface OffersInterface {
    id: String,
    name: String,
    description: String,
    serviceType: String,
    dataspeed: DataSpeed,
    pricePlan: PricePlan,
}

interface DataSpeed {
    uploadInKbps: String,
    downloadInKbps: String
}

interface PricePlan {
    priceTerm: PriceTerm[]
}

interface PriceTerm {
    amount: Number,
    amountR2: Number,
    durationInMonths: String,
    durationInMonthsR2: String,
    productId: String,
    sequence: String,
    termType: String,
    discount: Discount,
}

interface Discount {
    amount: Number,
    durationInMonths: Number,
}