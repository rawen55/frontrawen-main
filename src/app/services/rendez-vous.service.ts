import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RendezVousService {
  // Données factices
  private rendezVousList = [
    {
      id: 1,
      date: '2025-04-01',
      heure: '10:00',
      patient: { nom: 'John Doe' },
      statut: 'En attente',
    },
    {
      id: 2,
      date: '2025-04-02',
      heure: '14:00',
      patient: { nom: 'Jane Doe' },
      statut: 'Confirmé',
    },
    {
      id: 3,
      date: '2025-04-03',
      heure: '09:30',
      patient: { nom: 'Alex Smith' },
      statut: 'Reporté',
    },
  ];

  constructor() {}

  // Méthode pour récupérer tous les rendez-vous (ici, renvoie les données factices)
  getAllRendezVous(): Observable<any[]> {
    return of(this.rendezVousList);
  }

  // Méthode pour accepter un rendez-vous (simulé)
  acceptRendezVous(id: number): Observable<void> {
    const rendezVous = this.rendezVousList.find((rdv) => rdv.id === id);
    if (rendezVous) {
      rendezVous.statut = 'Confirmé';
    }
    return of();
  }

  // Méthode pour refuser un rendez-vous (simulé)
  rejectRendezVous(id: number): Observable<void> {
    const rendezVous = this.rendezVousList.find((rdv) => rdv.id === id);
    if (rendezVous) {
      rendezVous.statut = 'Refusé';
    }
    return of();
  }

  // Méthode pour reporter un rendez-vous (simulé)
  rescheduleRendezVous(id: number, nouvelleDate: string): Observable<void> {
    const rendezVous = this.rendezVousList.find((rdv) => rdv.id === id);
    if (rendezVous) {
      rendezVous.date = nouvelleDate;
      rendezVous.statut = 'Reporté';
    }
    return of();
  }
}

