import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeRendezVousComponent } from '../components/rendez-vous/liste-rendez-vous/liste-rendez-vous.component';  

@NgModule({
  imports: [
    CommonModule,
    ListeRendezVousComponent // 
  ],
  exports: [
    ListeRendezVousComponent // 
  ]
})
export class RendezVousModule { }




