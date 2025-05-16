import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';  
import { RegisterComponent } from './pages/register/register.component';
import { AppointmentsComponent } from './pages/medecin/appointments/appointments.component'; 
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { MedecinsComponent } from './pages/patient-dashboard/medecins/medecins.component';
import { ConfirmationComponent } from './pages/patient-dashboard/confirmation/confirmation.component'; 
import { ProfilComponent } from './pages/medecin/profil/profil.component'; 
import { FormRendezVousComponent } from './components/rendez-vous/form-rendez-vous/form-rendez-vous.component';  
import { ReactiveFormsModule } from '@angular/forms';
import { DiagnosticComponent } from './pages/diagnostic/diagnostic.component';
import { RendezVousService } from './services/rendez-vous.service';
import { DashboardMedecinComponent } from './dashboard-medecin/dashboard-medecin.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { DashboardPageComponent } from './pages/medecin/dashboard-page/dashboard-page.component';
import { AccueilComponent } from './pages/patient-dashboard/accueil/accueil.component';
import { ListeRendezVousComponent } from './components/rendez-vous/liste-rendez-vous/liste-rendez-vous.component';
import { AuthService } from './services/auth.service';
import { MesRendezVousComponent } from './pages/patient-dashboard/mesrendez-vous/mesrendez-vous.component';
import { StatistiqueComponent } from './pages/medecin/statistique/statistique.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormConsultationComponent } from './form-consultation/form-consultation.component';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

NgModule({
  declarations: [
    AdminDashboardComponent,
    StatistiqueComponent,
    FormConsultationComponent,
    DiagnosticComponent,
    ContactUsComponent,
   ProfilComponent,
    AppComponent,
    QuestionnaireComponent,
    MedecinsComponent,
    AccueilComponent ,
    HomeComponent,
    RendezVousService,
    AuthService,
    DashboardPageComponent,
   MesRendezVousComponent, 
    LoginComponent, 
    RegisterComponent,
    ConfirmationComponent,
    FilterPipe,
    PatientDashboardComponent,
    DashboardMedecinComponent,
    FormRendezVousComponent,
    AppointmentsComponent,
    ListeRendezVousComponent,
  
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule ,
    HttpClient,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule, // Ensure FormsModule is added here
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }