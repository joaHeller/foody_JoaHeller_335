import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then( m => m.FavoritesPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'restaurant-detail',
    loadComponent: () => import('./pages/restaurant-detail/restaurant-detail.page').then( m => m.RestaurantDetailPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
  },

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.page').then(m => m.TabsPage)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes)
  }
];
