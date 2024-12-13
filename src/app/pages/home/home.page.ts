import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '/Users/ICTW-LI-WS-106/foody/src/app/services/restaurant.service';
import { Restaurant } from '/Users/ICTW-LI-WS-106/foody/src/app/interfaces/restaurant.interface';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>Foody - Restaurants</ion-title>
      </ion-toolbar>
      <ion-toolbar color="dark">
        <ion-searchbar 
          [(ngModel)]="searchTerm"
          (ionInput)="handleSearch($event)"
          placeholder="Restaurant suchen..."
          [debounce]="300"
          color="dark"
          class="custom-searchbar"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" color="dark">
      <div *ngIf="loading" class="loading-container">
        <ion-spinner></ion-spinner>
        <p>Lade Restaurants...</p>
      </div>

      <div *ngIf="!loading && restaurants.length === 0" class="no-data-container">
        <p>Keine Restaurants gefunden</p>
      </div>

      <ion-list class="restaurant-list" *ngIf="!loading && restaurants.length > 0">
        <ion-item *ngFor="let restaurant of restaurants" class="restaurant-item">
          <ion-thumbnail slot="start">
            <img [src]="restaurant.image_url || 'bilder\Restaurant.jpg'" alt="Restaurant Bild"/>
          </ion-thumbnail>
          
          <ion-label>
            <div class="restaurant-name">{{ restaurant.name }}</div>
            <div class="restaurant-info">
              <span class="price-range">{{ restaurant.priceRange }}</span>
              <span *ngIf="restaurant.cuisine" class="cuisine"> · {{ restaurant.cuisine }}</span>
            </div>
            <div class="restaurant-address">{{ restaurant.address }}</div>
            <div class="opening-hours" *ngIf="restaurant.openingHours">{{ restaurant.openingHours }}</div>
            
            <div class="action-container">
              <div class="rating-container">
                <div class="star-rating">
                  <ion-icon 
                    *ngFor="let star of [1,2,3,4,5]"
                    [name]="restaurant.rating >= star ? 'star' : 'star-outline'"
                    class="star-icon"
                    (click)="rate(restaurant.id, star)"
                    color="warning"
                  ></ion-icon>
                </div>
                <span class="total-ratings">({{ restaurant.totalRatings }})</span>
              </div>
              
              <div class="control-buttons">
                <ion-button fill="clear" size="small">
                  <ion-icon name="camera" slot="icon-only"></ion-icon>
                </ion-button>
                <ion-button 
                  fill="clear" 
                  size="small"
                  (click)="toggleFavorite(restaurant)"
                >
                  <ion-icon 
                    [name]="restaurant.is_favorite ? 'heart' : 'heart-outline'"
                    [color]="restaurant.is_favorite ? 'danger' : 'medium'"
                    class="favorite-icon"
                  ></ion-icon>
                </ion-button>
              </div>
            </div>
          </ion-label>
        </ion-item>
      </ion-list>
      
      <ion-tab-bar slot="bottom" color="dark">
        <ion-tab-button tab="home">
          <ion-icon name="home"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="map">
          <ion-icon name="map"></ion-icon>
          <ion-label>Karte</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="favorites">
          <ion-icon name="heart"></ion-icon>
          <ion-label>Favoriten</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-content>
  `,
  styles: [`

    .custom-searchbar {
  --background: #1a1a1a;
  --placeholder-color: #666666;
  --icon-color: #666666;
  --border-radius: 4px;
  margin: 8px;
}

.restaurant-list {
  background: transparent;
  padding: 0;
  margin: 0;
}

.restaurant-item {
  --background: #242424;
  --border-color: #333333;
  margin: 8px;
  border-radius: 8px;
  padding: 12px;
}

.restaurant-name {
  font-size: 16px;
  font-weight: 600;
  color: #242424;
  margin-bottom: 4px;
}

.restaurant-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #888888;
  font-size: 13px;
  margin-bottom: 2px;
}

.price-range {
  color: #888888;
}

.cuisine {
  color: #888888;
}

.restaurant-address {
  color: #777777;
  font-size: 13px;
  margin-bottom: 2px;
}

.opening-hours {
  color: #666666;
  font-size: 12px;
  margin-bottom: 8px;
}

.action-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}

.rating-container {
  display: flex;
  align-items: center;
  gap: 6px;
}

.star-rating {
  display: flex;
  gap: 2px;
}

.star-icon {
  font-size: 16px;
  color: #ffd700;
  cursor: pointer;
}

.total-ratings {
  color: #666666;
  font-size: 12px;
}

.control-buttons {
  display: flex;
  gap: 4px;
}

.control-buttons ion-button {
  --padding-start: 4px;
  --padding-end: 4px;
  height: 32px;
}

.favorite-icon {
  font-size: 20px;
  cursor: pointer;
}

ion-thumbnail {
  --size: 70px;
  --border-radius: 6px;
  margin-right: 12px;
}

ion-content {
  --background: #121212;
}

ion-header ion-toolbar {
  --background: #1a1a1a;
  --border-color: #333333;
}

ion-tab-bar {
  --background: #1a1a1a;
  --border-color: #333333;
  border-top: 1px solid #333333;
}

ion-tab-button {
  --color: #888888;
  --color-selected: #ffffff;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #888888;
  
  ion-spinner {
    --color: #666666;
  }
}

.no-data-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666666;
}
    .custom-searchbar {
      --background: #1e1e1e;
      --color: white;
      --placeholder-color: #666;
      --icon-color: #666;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: white;
    }

    .no-data-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: #666;
    }

    .restaurant-list {
      background: transparent;
    }

    .restaurant-item {
      --background: #1e1e1e;
      margin-bottom: 8px;
      border-radius: 8px;
    }

    .restaurant-name {
      font-size: 18px;
      font-weight: bold;
      color: white;
      margin-bottom: 4px;
    }

    .restaurant-info {
      color: #999;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .restaurant-address {
      color: #999;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .opening-hours {
      color: #666;
      font-size: 13px;
      margin-bottom: 8px;
    }

    .action-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
    }

    .rating-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .star-rating {
      display: flex;
      gap: 4px;
    }

    .total-ratings {
      color: #666;
      font-size: 14px;
    }

    .star-icon {
      font-size: 20px;
      cursor: pointer;
    }

    .favorite-icon {
      font-size: 24px;
      cursor: pointer;
    }

    .control-buttons {
      display: flex;
      gap: 8px;
    }

    ion-thumbnail {
      --size: 80px;
      --border-radius: 8px;
    }

    ion-content {
      --background: #121212;
    }

    ion-tab-bar {
      border-top: 1px solid #333;
    }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})



export class HomePage implements OnInit {
  restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Restaurant Rössli",
      rating: 4.8,
      totalRatings: 58,
      priceRange: "CHF 30–40",
      address: "Dorfstrasse 41",
      openingHours: "Geöffnet ⋅ Schließt um 14:00 ⋅ Öffnet wieder um 17:30",
      services: ["Speisen vor Ort", "Abholung vor dem Laden"],
      coordinates: { latitude: 47.2081, longitude: 7.5396 },
      is_favorite: false
      
    },
    {
      id: 40,
      name: "Restaurant Sashi",
      rating: 5.0,
      totalRatings: 1200,
      priceRange: "CHF 30–40",
      address: "Dorfstrasse 4",
      openingHours: "Geöffnet ⋅ Schließt um 14:00 ⋅ Öffnet wieder um 17:30",
      services: ["Speisen vor Ort", "Abholung vor dem Laden"],
      coordinates: { latitude: 44.2081, longitude: 5.5396 },
      is_favorite: false
    },
    {
      id: 80,
      name: "Restaurant Tanne",
      rating: 2.8,
      totalRatings: 18,
      priceRange: "CHF 20–40",
      address: "Tannenbaum 4",
      openingHours: "Geöffnet ⋅ Schließt um 7:00 ⋅ Öffnet wieder um 17:30",
      services: ["Speisen vor Ort", "Abholung vor dem Laden"],
      coordinates: { latitude: 47.2081, longitude: 7.5396 },
      is_favorite: false
    },
    {
      id: 10,
      name: "Restaurant hallo",
      rating: 1.8,
      totalRatings: 58,
      priceRange: "CHF 30–40",
      address: "Dorfstrasse 41",
      openingHours: "Geöffnet ⋅ Schließt um 14:00 ⋅ Öffnet wieder um 17:30",
      services: ["Speisen vor Ort", "Abholung vor dem Laden"],
      coordinates: { latitude: 47.2081, longitude: 7.5396 },
      is_favorite: false
    },
    {
      id: 2,
      name: "Cantinetta Bindella Solothurn",
      rating: 4.3,
      totalRatings: 831,
      priceRange: "$$",
      cuisine: "Italienisch",
      address: "Ritterquai 3",
      openingHours: "Geöffnet ⋅ Schließt um 23:00",
      services: ["Speisen vor Ort"],
      coordinates: { latitude: 47.2067, longitude: 7.5382 },
      is_favorite: false
    },
    {
      id: 3,
      name: "Restaurant Pier 11",
      rating: 4.3,
      totalRatings: 1043,
      priceRange: "$$",
      address: "Glutzenhofstrasse 3",
      openingHours: "Geöffnet ⋅ Schließt um 14:00 ⋅ Öffnet wieder um 17:30",
      coordinates: { latitude: 47.2098, longitude: 7.5367 },
      is_favorite: false
    },
    {
      id: 4,
      name: "Pittaria Solothurn",
      rating: 4.8,
      totalRatings: 488,
      priceRange: "CHF 10–20",
      address: "Theatergasse 12",
      openingHours: "Geöffnet ⋅ Schließt um 14:00 ⋅ Öffnet wieder um 17:00",
      coordinates: { latitude: 47.2072, longitude: 7.5379 },
      is_favorite: false
    },
    {
      id: 5,
      name: "Salzhaus",
      rating: 4.5,
      totalRatings: 658,
      priceRange: "$$$",
      cuisine: "Asiatische Fusionsküche",
      address: "Landhausquai 15a",
      coordinates: { latitude: 47.2075, longitude: 7.5397 },
      is_favorite: false
    },
    {
      id: 6,
      name: "Restaurant La Couronne Mervelier",
      rating: 5.0,
      totalRatings: 17,
      priceRange: "CHF 20–30",
      address: "Rte Principale 30",
      openingHours: "Geöffnet ⋅ Schließt um 23:00",
      coordinates: { latitude: 47.2092, longitude: 7.5401 },
      is_favorite: false
    },
    {
      id: 7,
      name: "Bellevue",
      rating: 4.6,
      totalRatings: 302,
      priceRange: "$",
      cuisine: "Schweizerisch",
      address: "Bürenstrasse 60",
      coordinates: { latitude: 47.2058, longitude: 7.5412 },
      is_favorite: false
    }
  ];
  favorites: Restaurant[] = [];
  searchTerm = '';
  loading = false;
  

  constructor(
    private restaurantService: RestaurantService,
    private toastController: ToastController
  ) {}

   ngOnInit() {
    this.loadFavorites();
  }

  async loadFavorites() {
    const { value } = await Preferences.get({ key: 'favorites' });
    if (value) {
      const savedFavorites = JSON.parse(value);
      this.restaurants = this.restaurants.map(restaurant => ({
        ...restaurant,
        is_favorite: savedFavorites.some((fav: Restaurant) => fav.id === restaurant.id)
      }));
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'dark',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  async toggleFavorite(restaurant: Restaurant) {
    try {
      restaurant.is_favorite = !restaurant.is_favorite;
      
      // Get current favorites
      const { value } = await Preferences.get({ key: 'favorites' });
      let favorites: Restaurant[] = value ? JSON.parse(value) : [];
      
      if (restaurant.is_favorite) {
        // Add to favorites if not already present
        if (!favorites.some(fav => fav.id === restaurant.id)) {
          favorites.push({
            id: restaurant.id,
            name: restaurant.name,
            address: restaurant.address,
            rating: restaurant.rating,
            is_favorite: false,
            totalRatings: 0,
            priceRange: '',
            coordinates: {
              latitude: 0,
              longitude: 0
            }
          });
          await this.presentToast(`${restaurant.name} wurde zu Favoriten hinzugefügt`);
        }
      } else {
        // Remove from favorites
        favorites = favorites.filter(fav => fav.id !== restaurant.id);
        await this.presentToast(`${restaurant.name} wurde aus Favoriten entfernt`);
      }
      
      // Save updated favorites
      await Preferences.set({
        key: 'favorites',
        value: JSON.stringify(favorites)
      });
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revert the is_favorite status if there was an error
      restaurant.is_favorite = !restaurant.is_favorite;
      await this.presentToast('Fehler beim Aktualisieren der Favoriten');
    }
  }

  async handleSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.restaurants = this.restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm) ||
      restaurant.address.toLowerCase().includes(searchTerm) ||
      (restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(searchTerm))
    );
  }

    async rate(restaurantId: number, rating: number) {
    try {
      const restaurant = this.restaurants.find(r => r.id === restaurantId);
      if (restaurant) {
        restaurant.rating = rating;
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  }
}