// src/app/pages/map/map.page.ts
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { addIcons } from 'ionicons';
import { locationOutline, refreshOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Restaurant Map</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="getCurrentLocation()">
            <ion-icon name="refresh-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div id="map" style="height: 100%; width: 100%"></div>
      <div *ngIf="errorMsg" class="error-message">
        {{ errorMsg }}
      </div>
    </ion-content>
  `,
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon,  CommonModule]
})
export class MapPage implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;
  errorMsg: string = '';

  constructor() {
    addIcons({ locationOutline, refreshOutline });
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      console.log(`Location: ${this.latitude}, ${this.longitude}`);
      // Hier später die Karte und Restaurants in der Nähe anzeigen
    } catch (error) {
      this.errorMsg = 'Error getting location';
      console.error('Error getting location', error);
    }
  }
}