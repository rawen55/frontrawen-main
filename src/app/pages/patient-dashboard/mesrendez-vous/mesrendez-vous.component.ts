import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../../../services/rendez-vous.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-mes-rendez-vous',
  templateUrl: './mesrendez-vous.component.html',
  styleUrls: ['./mesrendez-vous.component.css']
})
export class MesRendezVousComponent implements OnInit {
  rendezVousList: any[] = []; // Liste des rendez-vous

  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    this.loadRendezVous();
  }

  loadRendezVous(): void {
    const patientId = localStorage.getItem('patientId'); // Récupère l'ID du patient depuis le stockage local
    if (patientId) {
      this.rendezVousService.getRendezVousByPatientId(patientId).subscribe({
        next: (data) => {
          this.rendezVousList = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des rendez-vous :', err);
        }
      });
    }
  }
}