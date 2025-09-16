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

export interface UserType {
  id_user: number;
  name: string;
  mail: string; 
  is_active: boolean;
  createdAt: string;
}

export interface PressMention {
  id_press_mention: number;
  media_name: string;
  article_name: string;
  article_url: string;
  description: string;
  date: string;
  link_text: string;
  image_path: string;
}

export interface ProjectType {
  id_project_type: number;
  name: string;
}

export interface ProjectImage {
  id_project_image: number;
  id_project: number;
  path: string;
}

export interface Project {
  id_project: number;
  id_project_type: number;
  name: string;
  description: string;
  cover_image: string;
  project_images?: ProjectImage[];
  project_type?: string;
}

