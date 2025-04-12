import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajoute RouterModule ici
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})

export class DashboardLayoutComponent {
  router: any;
  logout() {
    localStorage.removeItem('token'); // Suppression du token de session
    window.location.href = '/login';  // Redirige vers la page de connexion
  }
  ngOnInit(): void {
    const role = localStorage.getItem('role'); // Récupère le rôle de l'utilisateur
    const isAuthenticated = localStorage.getItem('isAuthenticated'); // Vérifie si l'utilisateur est authentifié (tu devrais avoir cette info dans le localStorage ou un autre moyen)

    if (!isAuthenticated || role !== 'medecin') {
      // Redirige vers la page de connexion ou une autre page si l'utilisateur n'est pas authentifié ou s'il n'a pas le rôle de médecin
      this.router.navigate(['/login']);
    }
  }
}
