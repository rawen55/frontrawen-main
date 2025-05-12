import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RendezVousService } from '../services/rendez-vous.service';


@Component({
  selector: 'app-dashboard-medecin',
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajoute RouterModule ici
  templateUrl: './dashboard-medecin.component.html',
 styleUrls: ['./dashboard-medecin.component.css']

})

export class DashboardMedecinComponent implements OnInit {
  isSidebarOpen = true;
  newConsultationCount: number = 0; // Counter for new consultations

  constructor(private rendezVousService: RendezVousService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  ngOnInit(): void {
    this.loadNewConsultationCount();
  }

  loadNewConsultationCount(): void {
    // Fetch the number of new consultations (e.g., EN_ATTENTE status)
    this.rendezVousService.getNewConsultations().subscribe({
      next: (count) => {
        this.newConsultationCount = count;
      },
      error: (err) => {
        console.error('Error fetching new consultations:', err);
      }
    });
  }

  resetConsultationCount(): void {
    // Reset the counter when the user views the "Mes patients" page
    this.newConsultationCount = 0;
  }

  router: any;
  logout() {
    localStorage.removeItem('token'); // Suppression du token de session
    window.location.href = '/login'; 
     // Redirige vers la page de connexion
  }/*
  ngOnInit(): void {
    const role = localStorage.getItem('role'); // Récupère le rôle de l'utilisateur
    const isAuthenticated = localStorage.getItem('isAuthenticated'); // Vérifie si l'utilisateur est authentifié (tu devrais avoir cette info dans le localStorage ou un autre moyen)

    if (!isAuthenticated || role !== 'medecin') {
      // Redirige vers la page de connexion ou une autre page si l'utilisateur n'est pas authentifié ou s'il n'a pas le rôle de médecin
      this.router.navigate(['/login']);
    }
  }*/
   
    }
