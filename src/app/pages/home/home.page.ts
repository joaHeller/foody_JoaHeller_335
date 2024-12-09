// src/app/pages/home/home.page.ts
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

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
      <ion-card>
        <img alt="Restaurant" src="path-to-image"/>
        <ion-card-header>
          <ion-card-title>Restaurant Name</ion-card-title>
          <ion-card-subtitle>Adresse des Restaurants</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="star-rating">
            <ion-icon
              *ngFor="let star of stars; let i = index"
              [name]="i < rating ? 'star' : 'star-outline'"
              color="warning"
              (click)="rate(i + 1)"
              style="font-size: 20px; padding: 2px; cursor: pointer;"
            ></ion-icon>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  rating = 4; // Startwert
  stars = new Array(5); // Array für 5 Sterne

  rate(value: number) {
    this.rating = value;
    console.log('Neue Bewertung:', this.rating);
    // Hier können Sie die Bewertung speichern oder weiteres Handling durchführen
  }
}