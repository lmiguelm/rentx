interface Accessory {
  type: string;
  name: string;
}

interface Rent {
  period: string;
  price: number;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: Rent;
  fuel_type: string;
  thumbnail: string;
  accessories: Accessory[];
  photos: string[];
}
