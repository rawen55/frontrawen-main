import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
 standalone:true,
 imports: [RouterModule ,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  specialites: string[] = [
    'Cardiologie',
    'Dermatologie',
    'Pédiatrie',
    'Neurologie',
    'Gynécologie',
    'Orthopédie',
    'Ophtalmologie',
    'Psychiatrie'
  ];
  showSpecialites: boolean = false; // Contrôle l'affichage du menu déroulant

  toggleSpecialitesDropdown(show: boolean): void {
    this.showSpecialites = show;
  }

  goToLogin() {
    throw new Error('Method not implemented.');
    }
      title = 'telemedecine-frontend';
      
    
}
