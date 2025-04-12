import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterPipe } from '../../../filter.pipe';
import { RendezVousService } from '../../../services/rendez-vous.service';

@Component({
  selector: 'app-liste-rendez-vous',
  templateUrl: './liste-rendez-vous.component.html',
  styleUrls: ['./liste-rendez-vous.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe]
})
export class ListeRendezVousComponent implements OnInit {
  selectedRdvId: number | null = null;
  showCalendar: boolean = false;
  newDate: string = '';
  searchText: string = '';
  rendezVousList: any[] = [];
  filteredRendezVous: any[] = [];
  confirmAction: string | null = null;
  statusFilter: string = '';
  router: any;

  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    // Tu peux utiliser l'un ou l'autre :
    // this.getRendezVous(); // depuis le backend
    this.loadFakeData(); // localement
  }

  // Données de test locales
  loadFakeData(): void {
    this.rendezVousList = [
      {
        id: 1,
        date: '2025-04-12T10:00',
        statut: 'En attente',
        patient: { nom: 'Ali', prenom: 'Ben Salah' }
      },
      {
        id: 2,
        date: '2025-04-13T15:30',
        statut: 'Confirmé',
        patient: { nom: 'Sarra', prenom: 'Trabelsi' }
      },
      {
        id: 3,
        date: '2025-04-14T09:00',
        statut: 'Refusé',
        patient: { nom: 'Mounir', prenom: 'Gharbi' }
      }
    ];
    this.filteredRendezVous = [...this.rendezVousList];
  }

  // Si tu veux activer le backend, utilise cette méthode
  getRendezVous(): void {
    this.rendezVousService.getAllRendezVous().subscribe((data: any) => {
      this.rendezVousList = data;
      this.filteredRendezVous = this.rendezVousList;
      console.log(this.rendezVousList);
    });
  }

  filterRendezVous(): void {
    if (this.statusFilter) {
      this.filteredRendezVous = this.rendezVousList.filter(rdv => rdv.statut === this.statusFilter);
    } else {
      this.filteredRendezVous = this.rendezVousList;
    }
  }
  goToRendezVous() {
    this.router.navigate(['/liste-rendez-vous']);
  }
  acceptRendezVous(id: number): void {
    console.log('Accepté', id);
    this.rendezVousList.find(r => r.id === id)!.statut = 'Confirmé';
    this.filterRendezVous();
  }

  rejectRendezVous(id: number): void {
    console.log('Refusé', id);
    this.rendezVousList.find(r => r.id === id)!.statut = 'Refusé';
    this.filterRendezVous();
  }

  onRendezVousClick(rdv: any): void {
    alert(`Rendez-vous avec ${rdv.patient?.prenom} ${rdv.patient?.nom} le ${rdv.date}`);
  }

  onReportClick(rdv: any): void {
    this.selectedRdvId = rdv.id;
    this.showCalendar = true;
  }

  submitNewDate(id: number): void {
    if (!this.newDate) {
      alert('Veuillez sélectionner une nouvelle date.');
      return;
    }
    const rdv = this.rendezVousList.find(r => r.id === id);
    if (rdv) {
      rdv.date = this.newDate;
      rdv.statut = 'Reporté';
    }
    this.showCalendar = false;
    this.newDate = '';
    this.filterRendezVous();
  }
}
