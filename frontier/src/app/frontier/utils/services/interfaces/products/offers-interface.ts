export interface OffersInterface {
  bestPriceTerm: PriceTerm;
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
  uploadInKbps: number,
  downloadInKbps: number
}

interface PricePlan {
  priceTerm: PriceTerm[]
}

export interface PriceTerm {
  discountedPrice: number;
  amount: string,
  amountR2: Number,
  durationInMonths: string,
  durationInMonthsR2: string,
  productId: string,
  sequence: string,
  termType: string,
  discount: Discount[],
}

export interface Discount {
  amount: string,
  durationInMonths: Number,
}
