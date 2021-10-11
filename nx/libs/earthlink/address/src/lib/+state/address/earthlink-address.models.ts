/**
 * Interface for the 'EarthlinkAddress' data
 */
export interface EarthlinkAddressEntity {
  id: string | number; // Primary ID
  address_line1: string
  address_line2?: string
  city: string
  state: string
  zip: string
  first_name: string
  last_name: string
  email: string
  phone: string
  is_business?: boolean
  alt_phone?: string
  error?: string
  uuid?: string
  submitted?: boolean
}
