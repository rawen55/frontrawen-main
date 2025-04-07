import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  
import { AppComponent } from './app/app.component';
import { RegisterComponent } from './app/pages/register/register.component';
import { LoginComponent } from './app/pages/login/login.component';
import { HomeComponent } from './app/pages/home/home.component';
import { FormRendezVousComponent } from './app/components/rendez-vous/form-rendez-vous/form-rendez-vous.component';  
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'rendez-vous', component: FormRendezVousComponent },
    ]),
    provideHttpClient()  
  ]
}).catch(err => console.error(err));
