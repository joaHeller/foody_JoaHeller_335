// src/app/services/restaurant.service.ts
import { Injectable } from '@angular/core';
import { supabase } from '../config/supabase.config';
import { Restaurant } from '../interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  async getRestaurants(): Promise<Restaurant[]> {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*');
      
    if (error) throw error;
    return data || [];
  }

  async updateRating(restaurantId: number, rating: number) {
    const { error } = await supabase
      .from('restaurants')
      .update({ rating })
      .eq('id', restaurantId);

    if (error) throw error;
  }
}