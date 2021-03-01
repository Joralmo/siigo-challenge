export interface Invoice {
  id?: number;
  document: Document;
  date: string;
  customer: Customer;
  seller: number;
  items: Item[];
  payments: Payment[];
}

interface Document {
  id: number;
  number?: number;
}

interface Customer {
  id?: string;
  identification: string;
  name?: string[];
}

interface Item {
  code: string;
  quantity: number;
  price: number;
  description?: string;
}

interface Payment {
  id: number;
  value: number;
}
