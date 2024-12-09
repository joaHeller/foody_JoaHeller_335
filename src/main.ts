import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { routes } from './app/app.routes';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { IonicStorageModule } from '@ionic/storage-angular';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes),
    importProvidersFrom(
      IonicModule.forRoot({}),
      IonicStorageModule.forRoot()
    ),
  ],
}).catch(err => console.log(err));