// src/app/pages/map/map.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MapPage implements OnInit {
  map: Leaflet.Map | undefined;
  markers: Leaflet.Marker[] = [];
  
  constructor() { }

  async ngOnInit() {
    setTimeout(() => {
      this.loadMap();
    }, 300);
  }

  loadMap() {
    const position = { lat: 51.339695, lng: 12.373075 }; 

    this.map = Leaflet.map('map').setView([position.lat, position.lng], 13);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const position = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
      
      if (this.map) {
        this.map.setView([position.lat, position.lng], 15);
        
        const marker = Leaflet.marker([position.lat, position.lng])
          .addTo(this.map)
          .bindPopup('Dein Standort')
          .openPopup();
        
        this.markers.push(marker);
        
        await this.loadNearbyRestaurants(position);
      }
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  async loadNearbyRestaurants(position: {lat: number, lng: number}) {
    if (!this.map) return;

    const mockRestaurants = [
      { name: 'Restaurant 1', lat: position.lat + 0.002, lng: position.lng + 0.002 },
      { name: 'Restaurant 2', lat: position.lat - 0.002, lng: position.lng - 0.002 },
    ];

    mockRestaurants.forEach(restaurant => {
      const marker = Leaflet.marker([restaurant.lat, restaurant.lng])
        .addTo(this.map!)
        .bindPopup(restaurant.name);
      this.markers.push(marker);
    });
  }

  ionViewDidLeave() {
    if (this.map) {
      this.map.remove();
    }
    this.markers = [];
  }
}