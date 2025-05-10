import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginResponse } from './login-response.model';
import { jwtDecode } from 'jwt-decode';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HeaderComponent],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
onSubmit() {
  const { email, password } = this.loginForm.value;
  this.authService.login(email, password).subscribe({
    next: (response) => {
      const token = response.token;
      const roles: string[] = response.roles;

      console.log('Token :', response.token);
      const decodedToken: any = jwtDecode(response.token);
      const userId = decodedToken.userId;
      console.log('User ID :', userId);

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId); // Stocker l'ID utilisateur dans localStorage

      if (roles.includes('PATIENT')) {
        this.router.navigate(['patient-dashboard']);
      } else if (roles.includes('MEDECIN')) {
        this.router.navigate(['/dashboard']);
      } else if (roles.includes('ADMIN')) {
        this.router.navigate(['/admin-dashboard']); // Redirection pour les administrateurs
      }
    },
    error: () => {
      this.errorMessage = 'Login failed';
    }
  });
}
}