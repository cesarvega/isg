export interface QuoteInterface {
  quoteId: String,
  status: Status,
  specName: String,
  description: String,
  state: String,
  productSummary: ProductSummary
  installationType: String,
  voiceService: String,
  videoService: String,
  dataService: String,
  items: Item[]
}

interface Status {
  quoteStatus: String,
  productsModifiable: Boolean,
  scheduleModifiable: Boolean,
  cancelAllowed: Boolean,
  productConfigStatus: String,
}

interface ProductSummary {
  productLineItemSummary: ProductLineItemSummary[]
}

interface ProductLineItemSummary {
  lineItemId: String,
  name: String,
  nonRecurringPrice: Number,
  recurringPrice: Number,
  serviceType: String,
  billOfMaterials: []
}

export interface Item {
  id,
  productId: String
  productConfiguration: ProductConfiguration,
  completed: boolean
}

export interface ProductConfiguration {
  ID,
  EntityID,
  Name,
  ChildEntity: ChildEntity[]
}

export interface ChildEntity {
  ID,
  Name,
  Parent?,
  ChangedManually?,
  ConfiguredValue,
  Mandatory,
  Active,
  minimumActiveChildEntities,
  maximumActiveChildEntities,
  Price: Price[],
  ChildEntity: ChildEntity[]
}

export interface ConfiguredValue {
  UseArea: string,
  CharacteristicID: string,
  Name: string,
  Mandatory: boolean,
  Active: boolean,
  Value: Value[]
}

export interface Value {
  ValueDetail: string,
  Value: string
}

interface Price {
  Name,
  rateNonRecurring: Number,
  rateRecurring: Number
}
