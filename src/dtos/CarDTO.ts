interface Accessory {
  id: string;
  type: string;
  name: string;
}

export interface Photos {
  id: string;
  photo: string;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: Accessory[];
  photos: Photos[];
}
