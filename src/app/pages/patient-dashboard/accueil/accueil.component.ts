import { Component } from '@angular/core';
import { ChatbotComponent } from '../../../components/chatbot/chatbot.component';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-accueil',
  imports: [ChatbotComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})

export class AccueilComponent {
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
