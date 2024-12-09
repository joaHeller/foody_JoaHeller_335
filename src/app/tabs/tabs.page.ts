// src/app/tabs/tabs.page.ts
import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, mapOutline, heartOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
          <ion-icon aria-hidden="true" name="home-outline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="map">
          <ion-icon aria-hidden="true" name="map-outline"></ion-icon>
          <ion-label>Map</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorites">
          <ion-icon aria-hidden="true" name="heart-outline"></ion-icon>
          <ion-label>Favoriten</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings">
          <ion-icon aria-hidden="true" name="settings-outline"></ion-icon>
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class TabsPage {
  constructor() {
    addIcons({ homeOutline, mapOutline, heartOutline, settingsOutline });
  }
}