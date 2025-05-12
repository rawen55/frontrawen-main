import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';  // Assure-toi d'importer le service
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-notifications',
  template: `
    <div *ngIf="notification" class="notification">
      🔔 {{ notification }}
    </div>
  `,
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notification: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    const patientId = sessionStorage.getItem('patientId');  // Assure-toi de stocker l'ID du patient lors de la connexion
    if (patientId) {
      this.notificationService.connect(parseInt(patientId)); // Connexion au WebSocket avec l'ID du patient

      this.notificationService.getNotifications().subscribe((message) => {
        this.notification = message;
        setTimeout(() => this.notification = null, 5000);  // Retirer la notification après 5 secondes
      });
    }
  }

  ngOnDestroy() {
    this.notificationService.disconnect(); // Déconnexion quand le composant est détruit
  }
}
