import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';  
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ListeRendezVousComponent } from './components/rendez-vous/liste-rendez-vous/liste-rendez-vous.component';
import { DetailRendezVousComponent } from './components/rendez-vous/detail-rendez-vous/detail-rendez-vous.component';
import { FormRendezVousComponent } from './components/rendez-vous/form-rendez-vous/form-rendez-vous.component';


  const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'liste-rendez-vous', component: ListeRendezVousComponent },
    { path: 'rendez-vous', component: FormRendezVousComponent }, 
    { path: 'rendez-vous/:id', component: DetailRendezVousComponent },
    { path: '', component: HomeComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
