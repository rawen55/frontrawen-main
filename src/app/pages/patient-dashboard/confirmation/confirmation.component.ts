import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone:true,
  imports: [CommonModule,RouterModule],
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  medecinNom: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer le paramètre 'medecin' pour afficher une confirmation personnalisée
    this.route.queryParams.subscribe(params => {
      this.medecinNom = params['medecin'];  // Récupérer le nom du médecin passé dans l'URL
    });
  }
}
