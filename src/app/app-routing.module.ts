import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ListeRendezVousComponent } from './components/rendez-vous/liste-rendez-vous/liste-rendez-vous.component';
import { FormRendezVousComponent } from './components/rendez-vous/form-rendez-vous/form-rendez-vous.component';
import { ProfilUserComponent } from './components/user/profil-user/profil-user.component';
import { RechercheMedecinComponent } from './recherche-medecin/recherche-medecin.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardPageComponent } from './pages/medecin/dashboard-page/dashboard-page.component';
import { OrdonnanceListComponent } from './pages/medecin/ordonnance-list/ordonnance-list.component';
import { NotificationsComponent } from './pages/medecin/notifications/notifications.component';
import { ProfileComponent } from './pages/medecin/profile/profile.component';
import { PatientsListComponent } from './pages/medecin/patients-list/patients-list.component';
import { DetailRendezVousComponent } from './components/rendez-vous/detail-rendez-vous/detail-rendez-vous.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [ 
  
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rendez-vous', component:FormRendezVousComponent },
  { path: 'rendez-vous/:id', component: DetailRendezVousComponent },
  { path: 'profil', component: ProfilUserComponent },
  { path: 'recherche-medecin', component: RechercheMedecinComponent },

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardPageComponent },
      { path: 'appointments', component: PatientsListComponent },
      { path: 'ordonnances', component: OrdonnanceListComponent },
      { path: 'patients', component: PatientsListComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
    
  },{ path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
