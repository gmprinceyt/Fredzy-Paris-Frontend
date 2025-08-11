export type User = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  photo: string;
};

export type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  discription: string;
  photo: string;
};

export type CartItems = {
  productId: string;
  price: number;
  quantity: number;
  name: string;
  photo: string;
  originalPrice?:number;
  stock: number;
};
export type ShippingInfo = {
  address: string;
  pincode: number;
  state: string;
  country: string;
  city: string;
};

export interface ProductProps {
  productId: string;
  name: string;
  price: number;
  stock: number;
  photo: string;
  discription: string;
  category: string;
  rating: number;
}
