import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  
import { AppComponent } from './app/app.component';
import { RegisterComponent } from './app/pages/register/register.component';
import { LoginComponent } from './app/pages/login/login.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]),
    provideHttpClient()  
  ]
}).catch(err => console.error(err));
