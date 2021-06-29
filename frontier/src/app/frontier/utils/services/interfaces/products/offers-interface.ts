export interface OffersInterface {
  addedApi?: boolean;
  id: string,
  name: string,
  description: string,
  serviceType: string,
  dataspeed: DataSpeed,
  pricePlan: PricePlan,
  selected: Boolean
}

interface DataSpeed {
  uploadInKbps: string,
  downloadInKbps: string
}

interface PricePlan {
  priceTerm: PriceTerm[]
}

interface PriceTerm {
  amount: Number,
  amountR2: Number,
  durationInMonths: string,
  durationInMonthsR2: string,
  productId: string,
  sequence: string,
  termType: string,
  discount: Discount,
}

interface Discount {
  amount: Number,
  durationInMonths: Number,
}
