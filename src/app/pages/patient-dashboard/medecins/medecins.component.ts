import { Component, OnInit } from '@angular/core';
import { MedecinService, Medecin } from '../../../services/medecin.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {
  medecins: Medecin[] = []; // Liste complète des médecins
  filteredMedecins: Medecin[] = []; // Liste des médecins filtrée selon la recherche
  searchQuery: string = ''; // Terme de recherche

  constructor(private medecinService: MedecinService) {}

  ngOnInit(): void {
    // Charger la liste des médecins depuis le service
    this.medecinService.getAllMedecins().subscribe(
      (data: Medecin[]) => {
        this.medecins = data;
        this.filteredMedecins = data; // Initialiser la liste filtrée avec la liste complète
      }
    );
  }

  searchMedecins(): void {
    const query = this.searchQuery.toLowerCase();
    // Filtrer les médecins par nom ou spécialité
    this.filteredMedecins = this.medecins.filter(medecin => 
      medecin.nom.toLowerCase().includes(query) ||
      medecin.specialite.toLowerCase().includes(query)
    );
  }
}