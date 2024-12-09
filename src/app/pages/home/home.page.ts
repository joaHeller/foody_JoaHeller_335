// src/app/pages/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '/Users/ICTW-LI-WS-106/foody/src/app/services/restaurant.service';
import { Restaurant } from '/Users/ICTW-LI-WS-106/foody/src/app/interfaces/restaurant.interface';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Foody - Restaurants
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card class="restaurant-card" *ngFor="let restaurant of restaurants">
        <img alt="Restaurant" [src]="restaurant.image_url || 'assets/default-restaurant.png'"/>
        <ion-card-header>
          <ion-card-title>{{restaurant.name}}</ion-card-title>
          <ion-card-subtitle>{{restaurant.address}}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="star-rating">
            <ion-icon
              *ngFor="let star of stars; let i = index"
              [name]="i < restaurant.rating ? 'star' : 'star-outline'"
              color="warning"
              (click)="rate(restaurant.id, i + 1)"
              class="star-icon"
            ></ion-icon>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [`
    .restaurant-card {
      background: #1e1e1e;
      color: white;
      margin: 16px;
    }
    .star-rating {
      display: flex;
      padding: 10px 0;
    }
    .star-icon {
      font-size: 24px;
      padding: 2px;
      cursor: pointer;
      color: #ffd700;
    }
    ion-card-title, ion-card-subtitle {
      color: white;
    }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  restaurants: Restaurant[] = [];
  stars = new Array(5);

  constructor(private restaurantService: RestaurantService) {}

  async ngOnInit() {
    try {
      this.restaurants = await this.restaurantService.getRestaurants();
    } catch (error) {
      console.error('Error loading restaurants:', error);
    }
  }

  async rate(restaurantId: number, rating: number) {
    try {
      await this.restaurantService.updateRating(restaurantId, rating);
      // Update local state
      this.restaurants = this.restaurants.map(restaurant => {
        if (restaurant.id === restaurantId) {
          return { ...restaurant, rating };
        }
        return restaurant;
      });
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  }
}