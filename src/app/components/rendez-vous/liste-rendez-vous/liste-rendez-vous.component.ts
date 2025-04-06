import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../../../services/rendez-vous.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from "../../../filter.pipe";

@Component({
  selector: 'app-liste-rendez-vous',
  templateUrl: './liste-rendez-vous.component.html',
  imports: [CommonModule, FormsModule, FilterPipe],
  styleUrls: ['./liste-rendez-vous.component.css']
})

export class ListeRendezVousComponent implements OnInit {
  rendezVousList: any[] = [];
  nouvelleDate: string = ''; // Stocke la nouvelle date pour le report
  confirmAction: string | null = null; // Gère l'action confirmée
  statusFilter: string = ''; // Filtre de statut
searchText: any;

  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    this.getRendezVous();
  }

  getRendezVous(): void {
    this.rendezVousService.getAllRendezVous().subscribe(data => {
      this.rendezVousList = data;
      this.filterRendezVous();
    });
  }

  // Méthode de filtrage des rendez-vous
  filterRendezVous(): void {
    if (this.statusFilter) {
      this.filteredRendezVous = this.rendezVousList.filter(rdv => rdv.statut === this.statusFilter);
    } else {
      this.filteredRendezVous = this.rendezVousList;
    }
  }

  acceptRendezVous(id: number): void {
    this.confirmAction = 'accepter';
    // Rappelle l'id du rendez-vous pour confirmation
  }

  rejectRendezVous(id: number): void {
    this.confirmAction = 'refuser';
    // Rappelle l'id du rendez-vous pour confirmation
  }

  cancelConfirmation(): void {
    this.confirmAction = null; // Annule la confirmation
  }

  confirmRdvAction(): void {
    if (this.confirmAction === 'accepter') {
      this.rendezVousService.acceptRendezVous(1).subscribe(() => {
        this.getRendezVous();
        this.confirmAction = null;
      });
    } else if (this.confirmAction === 'refuser') {
      this.rendezVousService.rejectRendezVous(0).subscribe(() => {
        this.getRendezVous();
        this.confirmAction = null;
      });
    }
  }
  onRendezVousClick(rdv: any): void {
    alert(`Vous avez cliqué sur le rendez-vous avec ${rdv.patient?.nom} le ${rdv.date}`);
  }


  rescheduleRendezVous(id: number): void {
    if (!this.nouvelleDate) {
      alert('Veuillez sélectionner une nouvelle date.');
      return;
    }
    this.rendezVousService.rescheduleRendezVous(id, this.nouvelleDate).subscribe(() => {
      this.getRendezVous();
      this.nouvelleDate = '';
    });
  }

  // Variable pour stocker les rendez-vous filtrés
  filteredRendezVous: any[] = [];
}


