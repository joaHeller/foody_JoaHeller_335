// src/app/pages/settings/settings.page.ts
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonToggle } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-settings',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Einstellungen</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>Dark Mode</ion-label>
          <ion-toggle 
            [(ngModel)]="darkMode" 
            (ionChange)="toggleDarkMode()">
          </ion-toggle>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Netzwerk Status</h2>
            <p>{{ connectionStatus }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Push-Benachrichtigungen</h2>
            <p>Neue Restaurants in der Nähe</p>
          </ion-label>
          <ion-toggle 
            [(ngModel)]="notifications" 
            (ionChange)="toggleNotifications()">
          </ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonToggle]
})
export class SettingsPage implements OnInit {
  darkMode = false;
  notifications = false;
  connectionStatus = 'Checking...';

  constructor() {}

  async ngOnInit() {
    await this.loadSettings();
    await this.checkNetworkStatus();
    this.setupNetworkListener();
  }

  async loadSettings() {
    const { value: darkMode } = await Preferences.get({ key: 'darkMode' });
    this.darkMode = darkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  async toggleDarkMode() {
    await Preferences.set({
      key: 'darkMode',
      value: String(this.darkMode)
    });
    document.body.classList.toggle('dark', this.darkMode);
  }

  async toggleNotifications() {
    await Preferences.set({
      key: 'notifications',
      value: String(this.notifications)
    });
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    this.connectionStatus = status.connected ? 'Online' : 'Offline';
  }

  setupNetworkListener() {
    Network.addListener('networkStatusChange', status => {
      this.connectionStatus = status.connected ? 'Online' : 'Offline';
    });
  }
}