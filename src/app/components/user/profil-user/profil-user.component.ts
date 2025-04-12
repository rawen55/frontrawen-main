import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent {
  user = {
    fullName: 'Rawen Trabelsi',
    email: 'rawen@example.com',
    birthDate: '2000-01-01'
  };

  onEdit() {
    alert('Fonction de modification à implémenter');
  }
}
