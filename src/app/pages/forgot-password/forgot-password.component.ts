import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule ,} from '@angular/common';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [
    CommonModule,
   FormsModule 
  ]

  
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:8080/api/auth/forgot-password', { email: this.email })
      .subscribe({
        next: () => {
          window.alert("Un email de réinitialisation a été envoyé !");
        },
        error: (err) => {
          window.alert("Erreur : " + err.error);
        }
      });
  }
}
