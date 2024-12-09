import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Restaurant {
  id: number;
  name: string;
  image_url: string;
  rating: number;
  is_favorite: boolean;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private FAVORITES_KEY = 'favorites';
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getFavorites(): Promise<Restaurant[]> {
    const favorites = await this._storage?.get(this.FAVORITES_KEY) || [];
    return favorites;
  }

  async toggleFavorite(restaurantId: number, isFavorite: boolean): Promise<void> {
    const favorites = await this.getFavorites();
    
    if (isFavorite) {
      const restaurant = this.getRestaurants().find(r => r.id === restaurantId);
      if (restaurant) {
        restaurant.is_favorite = true;
        favorites.push(restaurant);
      }
    } else {
      const index = favorites.findIndex(r => r.id === restaurantId);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }

    await this._storage?.set(this.FAVORITES_KEY, favorites);
  }

  getRestaurants(): Restaurant[] {
    return [
      {
        id: 1,
        name: 'Barbie Dream Café',
        image_url: 'assets/barbie-cafe.png',
        rating: 5,
        is_favorite: false,
        address: 'Traumstraße 1, 12345 Spielzeugstadt'
      },
      {
        id: 2,
        name: 'Barbies Patisserie',
        image_url: 'assets/barbie-patisserie.png',
        rating: 4,
        is_favorite: false,
        address: 'Puppengasse 23, 12345 Spielzeugstadt'
      },
      // ... weitere Restaurants wie zuvor
    ];
  }
}