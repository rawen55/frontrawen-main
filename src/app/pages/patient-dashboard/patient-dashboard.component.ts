import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  imports: [RouterOutlet, RouterModule,],
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent {
  ngOnInit(): void {
    // Redirige automatiquement vers la page d'accueil
    this.router.navigate(['/patient-dashboard/Accueil']);
  }

  isSidebarHidden = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  logout() {
    // Ajoute ici ta logique de déconnexion
    localStorage.clear(); // exemple
    this.router.navigate(['/login']);
  }
}
