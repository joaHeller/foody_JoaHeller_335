import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';

interface Restaurant {
  id: number;
  name: string;
  image_url: string;
  rating: number;
  is_favorite: boolean;
  address: string;
}

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Foody - Barbie Restaurants
        </ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          [(ngModel)]="searchTerm"
          (ionInput)="handleSearch($event)"
          placeholder="Restaurant suchen..."
          [debounce]="300"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item *ngFor="let restaurant of filteredRestaurants">
          <ion-thumbnail slot="start">
            <ion-img [src]="restaurant.image_url || 'assets/placeholder-restaurant.png'"></ion-img>
          </ion-thumbnail>
          <ion-label>
            <h2>{{restaurant.name}}</h2>
            <p>{{restaurant.address}}</p>
            <div class="rating-actions">
              <div class="star-rating">
                <ion-icon
                  *ngFor="let star of [1,2,3,4,5]"
                  [name]="star <= restaurant.rating ? 'star' : 'star-outline'"
                  color="warning"
                ></ion-icon>
              </div>
              <div class="action-buttons">
                <ion-button fill="clear" (click)="takePicture(restaurant)">
                  <ion-icon slot="icon-only" name="camera"></ion-icon>
                </ion-button>
                <ion-button fill="clear" (click)="toggleFavorite(restaurant)">
                  <ion-icon 
                    slot="icon-only" 
                    [name]="restaurant.is_favorite ? 'heart' : 'heart-outline'"
                    [color]="restaurant.is_favorite ? 'danger' : 'medium'"
                  ></ion-icon>
                </ion-button>
              </div>
            </div>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  styles: [`
    .rating-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
    }

    .star-rating {
      display: flex;
      gap: 4px;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    ion-button {
      --padding-start: 8px;
      --padding-end: 8px;
    }

    ion-icon {
      font-size: 20px;
    }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  restaurants: Restaurant[] = [
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
    {
      id: 3,
      name: 'Pink Paradise Restaurant',
      image_url: 'assets/pink-paradise.png',
      rating: 5,
      is_favorite: false,
      address: 'Rosaplatz 42, 12345 Spielzeugstadt'
    },
    {
      id: 4,
      name: 'Malibu Kitchen',
      image_url: 'assets/malibu-kitchen.png',
      rating: 4,
      is_favorite: false,
      address: 'Strandweg 7, 12345 Spielzeugstadt'
    },
    {
      id: 5,
      name: 'Barbies Gourmet Grille',
      image_url: 'assets/barbie-grille.png',
      rating: 3,
      is_favorite: false,
      address: 'Fashionstraße 15, 12345 Spielzeugstadt'
    }
  ];
  
  filteredRestaurants: Restaurant[] = [];
  searchTerm = '';

  constructor() {
    this.filteredRestaurants = this.restaurants;
  }

  ngOnInit() {
    this.loadRestaurants();
  }

  async loadRestaurants() {
    this.filteredRestaurants = this.restaurants;
  }

  handleSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm)
    );
  }

  async takePicture(restaurant: Restaurant) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      console.log('Picture taken:', image.webPath);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  toggleFavorite(restaurant: Restaurant) {
    restaurant.is_favorite = !restaurant.is_favorite;
  }
}