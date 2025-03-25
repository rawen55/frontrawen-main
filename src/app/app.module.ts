import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';  
import { RegisterComponent } from './pages/register/register.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    RegisterComponent  
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