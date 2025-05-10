import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

  constructor(private userService: UserService) {}
  nomPatient: string = '';
 

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.nomPatient = user.nom;
     
      console.log('Nom du patient:', this.nomPatient);
     
    }, error => {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
      this.nomPatient = 'Nom non disponible';
    });
  }
}
