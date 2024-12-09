import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  async initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const { value } = await Preferences.get({ key: 'darkMode' });
    
    if (value === null) {
      this.setDarkMode(prefersDark.matches);
    } else {
      this.setDarkMode(value === 'true');
    }

    prefersDark.addEventListener('change', (e) => {
      this.setDarkMode(e.matches);
    });
  }

  setDarkMode(dark: boolean) {
    document.body.classList.toggle('dark', dark);
    Preferences.set({ key: 'darkMode', value: String(dark) });
  }
}