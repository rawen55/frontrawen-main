import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRendezVousComponent } from './form-rendez-vous/form-rendez-vous.component';  // Assurez-vous que le chemin est correct


@NgModule({
  imports: [
    CommonModule,
    FormRendezVousComponent,
    ReactiveFormsModule 
  ],
  exports: [FormRendezVousComponent]  
})
export class RendezvousModule { }
