import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MedecinService } from '../services/medecin.service';
@Component({
  selector: 'app-recherche-medecin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recherche-medecin.component.html',
  styleUrls: ['./recherche-medecin.component.css']
})
export class RechercheMedecinComponent implements OnInit {
 
  filteredMedecins: any[] = [];  // Liste filtrée des médecins
  searchText: string = '';  // Texte de recherche pour le nom ou la spécialité

  constructor(private medecinService: MedecinService) {}

  ngOnInit(): void {
    this.getMedecins();  // Récupérer la liste des médecins dès l'initialisation
  }

  // Récupérer la liste des médecins depuis le service
  getMedecins(): void {
    this.medecinService.getAllMedecins().subscribe((data: any[]) => {
      this.medecins = data;
      this.filteredMedecins = data;  // Par défaut, tous les médecins sont affichés
    });
  }

  // Méthode pour filtrer les médecins par nom ou spécialité
  filterMedecins(): void {
    if (this.searchText) {
      // Filtrer par nom ou spécialité
      this.filteredMedecins = this.medecins.filter(medecin =>
        medecin.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
        medecin.specialite.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredMedecins = this.medecins;  // Si aucune recherche, on affiche tous les médecins
    }
  }

  medecins = [
    { id: '', nom: 'Dr. ', specialite: '' },
   
  ];
  demanderRdv(medecin: any): void {
    alert(`Vous avez demandé un rendez-vous avec ${medecin.nom} (${medecin.specialite})`);
    // Tu peux ici rediriger vers le formulaire de RDV ou ouvrir une modale
  }
}