export interface ClientType {
  id_client: number;
  name: string;
  pro: boolean;
  tel: string;
  mail: string;
  address: string;
  post_code: number;
  city: string;
  siren: string;
}

export interface OrderType {
  id_order: number;
  id_client: number;
  price: number;
  quote_number: number;
  site_name: string;
  ordered_at: string;
  deposit_rate: number;
  deposit_paid: boolean;
  site_address: string;
  client_name: string;
  user_id: number;
  user_name: string;
  id_contact: number;
  object: string;
  validated: boolean;
  paid: boolean;
  billed: boolean;
  billing_date: string;
  payement_date: string;
  reference: string;
  comment: string;
  unpaid: number;
  contact_name: string;
}

export interface ProductType {
  id_product: number;
  id_order: number;
  designation: string;
  quantity: number;
  id_status: string;
  unit: string;
}

export interface ContactType {
  id_contact: number;
  id_client: number;
  name: string;
  mail: string;
  mobile: string;
  landline: string;
}
