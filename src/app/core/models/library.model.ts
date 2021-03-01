export interface Library {
  name: string;
  version: string;
}

export interface InventoryGroups {
  id: number,
  name: string,
  active: boolean
}

export interface Product {
  id?: string,
  account_group: number,
  code: string,
  name: string,
  price: number
}

export interface ThirdParty {
  id?: string,
  person_type: string,
  id_type: string,
  identification: string,
  name: Array<string>,
  address: Address,
  phones: Array<Phone>,
  contacts: Array<Contact>
}

export interface Contact {
  first_name: string,
  last_name: string,
  email: string
}

export interface Phone {
  number: string
}

export interface Address {
  address: string,
  city: City,
}

export interface City {
  country_code: string,
  state_code: string,
  city_code: string,
  city_name?: string,
  state_name?: string,
  country_name?: string,
  name?: string
}

export interface Identification {
  id_type: string,
  name: string
}

export interface User {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  active: boolean,
  identification: string
}

export interface DocumentType {
  id: number,
  code: string,
  name: string,
  description: string,
  type: string,
  active: boolean,
  seller_by_item: boolean,
  cost_center: boolean,
  cost_center_mandatory: boolean,
  automatic_number: boolean,
  consecutive: number,
  discount_type: string,
  decimals: boolean,
  advance_payment: boolean,
  reteiva: boolean,
  reteica: boolean,
  self_withholding: boolean,
  self_withholding_limit: number,
  invoice_type: string
}

export interface PaymentMethods {
  id: number,
  name: string,
  type: string,
  active: boolean,
  due_date: boolean
}

export interface Invoice {
  id?: number,
  document: Document,
  date: string,
  customer: Customer,
  seller: number,
  items: Array<Item>,
  payments: Array<Payment>
}

export interface Document {
  id: number,
  number?: number
}

export interface Customer {
  id?: string,
  identification: string,
  name?: Array<string>
}

export interface Item {
  code: string,
  quantity: number,
  price: number,
  description?: string
}

export interface Payment {
  id: number,
  value: number
}