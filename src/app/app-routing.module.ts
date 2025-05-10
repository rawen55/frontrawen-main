import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { ListeRendezVousComponent } from './components/rendez-vous/liste-rendez-vous/liste-rendez-vous.component';
import { FormRendezVousComponent } from './components/rendez-vous/form-rendez-vous/form-rendez-vous.component';
import { RechercheMedecinComponent } from './recherche-medecin/recherche-medecin.component';
import { DashboardMedecinComponent } from './dashboard-medecin/dashboard-medecin.component';
import { DashboardPageComponent } from './pages/medecin/dashboard-page/dashboard-page.component';
import { OrdonnanceListComponent } from './pages/medecin/ordonnance-list/ordonnance-list.component';
import { NotificationsComponent } from './pages/medecin/notifications/notifications.component';
import { PatientsListComponent } from './pages/medecin/patients-list/patients-list.component';
import { DetailRendezVousComponent } from './components/rendez-vous/detail-rendez-vous/detail-rendez-vous.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
//import { AuthGuard } from './auth.guard';
import { ProfilComponent } from './pages/medecin/profil/profil.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { StatistiqueComponent } from './pages/medecin/statistique/statistique.component';

import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AccueilComponent } from './pages/patient-dashboard/accueil/accueil.component';
import { MedecinsComponent } from './pages/patient-dashboard/medecins/medecins.component';
import { DocumentsComponent } from './pages/patient-dashboard/documents/documents.component';
import { OrdonnancesComponent } from './pages/patient-dashboard/ordonnances/ordonnances.component';
import { ConfirmationComponent } from './pages/patient-dashboard/confirmation/confirmation.component';
import { DiagnosticComponent } from './pages/diagnostic/diagnostic.component';
import { MesRendezVousComponent } from './pages/patient-dashboard/mesrendez-vous/mesrendez-vous.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
export const routes: Routes = [
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'form-rendez-vous/:medecinId', component: FormRendezVousComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rendez-vous', component: FormRendezVousComponent },
  { path: 'rendez-vous/:id', component: DetailRendezVousComponent },
  { path: 'recherche-medecin', component: RechercheMedecinComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {

    path: 'patient-dashboard',
    component: PatientDashboardComponent,
    children: [


      { path: 'form-rendez-vous/:medecinId', component: FormRendezVousComponent, },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: 'confirmation/Accueil', component: AccueilComponent },
      { path: 'Accueil', component: AccueilComponent },
      { path: 'mesrendez-vous', component: MesRendezVousComponent },
      { path: 'medecins', component: MedecinsComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'ordonnances', component: OrdonnancesComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'notifications', component: NotificationsComponent },
    ]
  }, { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'dashboard',
    component: DashboardMedecinComponent,
    /*canActivate: [AuthGuard],*/
    children: [
      { path: '', component: DashboardPageComponent },
      { path: 'appointments', component: ListeRendezVousComponent },
      { path: 'appointments/diagnostic/:id', component: DiagnosticComponent },
      { path: 'ordonnances', component: OrdonnanceListComponent },
      { path: 'patients', component: PatientsListComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'statistique', component: StatistiqueComponent }

    ]

  }, { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
