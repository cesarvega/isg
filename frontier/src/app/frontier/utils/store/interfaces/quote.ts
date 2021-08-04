export interface QuoteInterface {
  quoteId: string,
  status: Status,
  specName: string,
  description: string,
  state: string,
  productSummary: ProductSummary
  installationType: string,
  voiceService: string,
  videoService: string,
  dataService: string,
  items: Item[]
}

interface Status {
  quoteStatus: string,
  productsModifiable: Boolean,
  scheduleModifiable: Boolean,
  cancelAllowed: Boolean,
  productConfigStatus: string,
}

interface ProductSummary {
  productLineItemSummary: ProductLineItemSummary[]
}

interface ProductLineItemSummary {
  lineItemId: string,
  name: string,
  nonRecurringPrice: Number,
  recurringPrice: Number,
  serviceType: string,
  billOfMaterials: []
}

export interface Item {
  id,
  productId: string
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
  ChangedManually?,
  ConfiguredValue,
  Mandatory,
  Active,
  hasAction?,
  minimumActiveChildEntities,
  maximumActiveChildEntities,
  Price: Price[],
  ChildEntity: ChildEntity[],
  isContainer?
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
  rateNonRecurring,
  rateRecurring
}
