import { Product } from './product';
export interface Shop {

  id: string;
  username: string;
  password: string;
  name: string;
  address: string;
  email: string;
  imageUrl: string;
  contact: string;
  owner: string;
  products: Product[];

}
