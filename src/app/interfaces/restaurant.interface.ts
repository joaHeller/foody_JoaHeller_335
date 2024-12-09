// src/app/interfaces/restaurant.interface.ts
export interface Restaurant {
    id: number;
    name: string;
    address: string;
    rating: number;
    image_url?: string;
  }

// src/app/interfaces/restaurant.interface.ts
export interface Restaurant {
    id: number;
    name: string;
    address: string;
    rating: number;
    image_url?: string;
    is_favorite: boolean;  // Dies wurde vergessen
  }