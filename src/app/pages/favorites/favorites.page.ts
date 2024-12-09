// src/app/pages/favorites/favorites.page.ts
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';
import { addIcons } from 'ionicons';
import { heartOutline, trashOutline } from 'ionicons/icons';

interface FavoriteRestaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
}

@Component({
  selector: 'app-favorites',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Meine Favoriten</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item *ngFor="let restaurant of favorites">
          <ion-label>
            <h2>{{ restaurant.name }}</h2>
            <p>{{ restaurant.address }}</p>
            <p>Rating: {{ restaurant.rating }}/5</p>
          </ion-label>
          <ion-icon 
            name="trash-outline" 
            slot="end"
            (click)="removeFavorite(restaurant.id)">
          </ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon]
})
export class FavoritesPage implements OnInit {
  favorites: FavoriteRestaurant[] = [];

  constructor() {
    addIcons({ heartOutline, trashOutline });
  }

  async ngOnInit() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    const { value } = await Preferences.get({ key: 'favorites' });
    this.favorites = value ? JSON.parse(value) : [];
  }

  async removeFavorite(id: string) {
    this.favorites = this.favorites.filter(r => r.id !== id);
    await Preferences.set({
      key: 'favorites',
      value: JSON.stringify(this.favorites)
    });
  }
}