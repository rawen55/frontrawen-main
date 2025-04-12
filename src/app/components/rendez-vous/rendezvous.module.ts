import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRendezVousComponent } from './form-rendez-vous/form-rendez-vous.component'; 
import { ListeRendezVousComponent } from './liste-rendez-vous/liste-rendez-vous.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ListeRendezVousComponent,
    FormRendezVousComponent,
    AppRoutingModule,
    ReactiveFormsModule 
  ],
  exports: [FormRendezVousComponent]  
})
export class RendezvousModule { }
