import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../../../services/rendez-vous.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  imports: [CommonModule,FormsModule],
  selector: 'app-mes-rendez-vous',
  templateUrl: './mesrendez-vous.component.html',
  styleUrls: ['./mesrendez-vous.component.css']
})
export class MesRendezVousComponent implements OnInit {
 rendezVousList: any[] = [];  // Liste des rendez-vous
selectedStatut: string = 'ALL'; 
filteredRendezVousList: any;
  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    this.loadRendezVous();
  }

// Method to update the filtered list of rendez-vous
updateFilteredRendezVousList(): void {
  if (this.selectedStatut === 'ALL') {
    this.filteredRendezVousList = this.rendezVousList;
  } else {
    this.filteredRendezVousList = this.rendezVousList.filter(rdv => rdv.statutrdv === this.selectedStatut);
  }
}
loadRendezVous(): void {
  const patientId = localStorage.getItem('patientId');
  if (patientId) {
    this.rendezVousService.getRendezVousByPatientId(patientId).subscribe({
      next: (data) => {
        this.rendezVousList = data;
        this.updateFilteredRendezVousList();  // 👈 Appliquer le filtre après chargement
      },
      error: (err) => {
        console.error('Erreur lors du chargement des rendez-vous :', err);
      }
    });
  }
}}
