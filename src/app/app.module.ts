import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';  
import { RegisterComponent } from './pages/register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ListeRendezVousComponent } from './components/rendez-vous/liste-rendez-vous/liste-rendez-vous.component'; // Importer le composant
import { RouterModule } from '@angular/router';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent, 
    RegisterComponent,
    FilterPipe,
    FormsModule ,
    ListeRendezVousComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }