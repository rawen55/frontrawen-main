import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';  
import { RegisterComponent } from './pages/register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { FormRendezVousComponent } from './components/rendez-vous/form-rendez-vous/form-rendez-vous.component';  
import { ReactiveFormsModule } from '@angular/forms';
NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent, 
    RegisterComponent,
    FilterPipe,
    FormsModule ,
    ReactiveFormsModule,
    FormRendezVousComponent,
   
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