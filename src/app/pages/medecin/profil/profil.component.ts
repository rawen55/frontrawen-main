import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'; // chemin absolu correct
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../src/app/models/userprofil';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userProfile?: UserProfile;
  loading = true;
  errorMsg?: string;
  user: any;
  
  constructor(private UserService: UserService) {}
  
  ngOnInit(): void {
    this.UserService.getUserProfile().subscribe({
      next: data => this.user = data,
      error: err => console.error('Erreur lors du chargement du profil', err)
    });
  
  }
  onPhotoSelected(event: Event): void {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (!file) {
    console.error('No file selected');
    return;
  }

  if (!this.user?.id) {
    console.error('User ID is missing');
    return;
  }

  console.log('Selected file:', file);
  console.log('User ID:', this.user?.id);
  this.UserService.uploadProfilePhoto(this.user.id, file).subscribe({
    next: (updatedUser) => {
      this.user = updatedUser; // Update the user object with the response
      console.log('Photo updated successfully:', updatedUser.photoUrl);
    },
    error: (err) => {
      console.error('Error uploading photo:', err);
    },
  });
}
}
  




