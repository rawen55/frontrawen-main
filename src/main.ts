import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module'; // Importer les routes directement

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Passer les routes ici
    provideHttpClient()
  ]
}).catch(err => console.error(err));
