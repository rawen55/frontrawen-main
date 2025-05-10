import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-medecin',
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajoute RouterModule ici
  templateUrl: './dashboard-medecin.component.html',
 styleUrls: ['./dashboard-medecin.component.css']

})

export class DashboardMedecinComponent {
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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
