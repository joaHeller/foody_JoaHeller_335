// src/app/services/restaurant.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Restaurant } from '../interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async getRestaurants(searchTerm: string = ''): Promise<Restaurant[]> {
    try {
      let query = this.supabase
        .from('restaurants')
        .select('*');

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return [];
    }
  }

  async toggleFavorite(restaurantId: number, isFavorite: boolean): Promise<void> {
    const { error } = await this.supabase
      .from('restaurants')
      .update({ is_favorite: isFavorite })
      .eq('id', restaurantId);

    if (error) throw error;
  }

  async updateRating(restaurantId: number, rating: number): Promise<void> {
    const { error } = await this.supabase
      .from('restaurants')
      .update({ rating })
      .eq('id', restaurantId);

    if (error) throw error;
  }
}