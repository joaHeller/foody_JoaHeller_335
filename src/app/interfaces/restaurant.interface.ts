// src/app/interfaces/restaurant.interface.ts
export interface Restaurant {
    id: number;
    name: string;
    address: string;
    rating: number;
    image_url?: string;
  }

export interface Restaurant {
    id: number;
    name: string;
    address: string;
    rating: number;
    image_url?: string;
    is_favorite: boolean;  // Dies wurde vergessen
  }

  // src/app/interfaces/restaurant.interface.ts
export interface Restaurant {
  id: number;
  name: string;
  address: string;
  rating: number;
  image_url?: string;
  is_favorite: boolean;
}
export interface Restaurant {
  id: number;  
  name: string;
  address: string;
  rating: number;
  is_favorite: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  totalRatings: number;
  priceRange: string;
  address: string;
  openingHours?: string;
  services?: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  cuisine?: string;
  is_favorite: boolean;
}