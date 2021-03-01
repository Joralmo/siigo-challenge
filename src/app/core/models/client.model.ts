import { City } from './city.modal';

export interface Client {
  id?: string;
  person_type: string;
  id_type: IdType;
  identification: string;
  name: string[];
  address: Address;
  phones: Phone[];
  contacts: Contact[];
}

export interface IdType {
  code: number;
  name: string;
}

export interface Contact {
  first_name: string;
  last_name: string;
  email: string;
  phone?: Phone;
}

export interface Phone {
  number: string;
}

export interface Address {
  address: string;
  city: City;
}
