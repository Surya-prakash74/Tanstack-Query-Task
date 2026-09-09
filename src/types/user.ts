export interface UserAddress {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo?: {
    lat: string;
    lng: string;
  };
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: UserAddress;
  company: UserCompany;
}