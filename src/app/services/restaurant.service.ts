// src/app/services/restaurant.service.ts
import { Injectable } from '@angular/core';
import { supabase } from '../config/supabase.config';
import { Restaurant } from '../interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  // Basis-Methode zum Abrufen aller Restaurants
  async getRestaurants(searchTerm: string = ''): Promise<Restaurant[]> {
    let query = supabase
      .from('restaurants')
      .select('*');
    
    if (searchTerm && searchTerm.trim() !== '') {
      query = query.ilike('name', `%${searchTerm}%`);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  // Methode zum Abrufen der Favoriten
  async getFavorites(): Promise<Restaurant[]> {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('is_favorite', true);
    
    if (error) throw error;
    return data || [];
  }

  // Methode zum Aktualisieren des Favoriten-Status
  async toggleFavorite(restaurantId: number, isFavorite: boolean): Promise<void> {
    const { error } = await supabase
      .from('restaurants')
      .update({ is_favorite: isFavorite })
      .eq('id', restaurantId);

    if (error) throw error;
  }

  // Methode zum Aktualisieren des Ratings
  async updateRating(restaurantId: number, rating: number): Promise<void> {
    const { error } = await supabase
      .from('restaurants')
      .update({ rating })
      .eq('id', restaurantId);

    if (error) throw error;
  }
}