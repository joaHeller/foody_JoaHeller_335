// src/app/pages/favorites/favorites.page.ts
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant.interface';

@Component({
  selector: 'app-favorites',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Favoriten</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card class="restaurant-card" *ngFor="let restaurant of favorites">
        <img alt="Restaurant" [src]="restaurant.image_url || 'assets/default-restaurant.png'"/>
        <ion-card-header>
          <ion-card-title>{{restaurant.name}}</ion-card-title>
          <ion-card-subtitle>{{restaurant.address}}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="rating-favorite-container">
            <div class="star-rating">
              <ion-icon
                *ngFor="let star of stars; let i = index"
                [name]="i < restaurant.rating ? 'star' : 'star-outline'"
                color="warning"
                class="star-icon"
              ></ion-icon>
            </div>
            <ion-icon
              name="heart"
              color="danger"
              class="favorite-icon"
              (click)="toggleFavorite(restaurant)"
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
    .rating-favorite-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .star-rating {
      display: flex;
    }
    .star-icon {
      font-size: 24px;
      padding: 2px;
      color: #ffd700;
    }
    .favorite-icon {
      font-size: 24px;
      cursor: pointer;
    }
    ion-card-title, ion-card-subtitle {
      color: white;
    }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FavoritesPage implements OnInit {
  favorites: Restaurant[] = [];
  stars = new Array(5);

  constructor(private restaurantService: RestaurantService) {}

  async ngOnInit() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    this.favorites = await this.restaurantService.getFavorites();
  }

  async toggleFavorite(restaurant: Restaurant) {
    await this.restaurantService.toggleFavorite(restaurant.id, !restaurant.is_favorite);
    await this.loadFavorites();
  }
}