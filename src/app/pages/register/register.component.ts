import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
registerForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required], 
      specialite: [''] // sera requis seulement si le rôle est "medecin"
    });

    this.form.get('role')?.valueChanges.subscribe(role => {
      const specialiteControl = this.form.get('specialite');
      if (role === 'medecin') {
        specialiteControl?.setValidators([Validators.required]);
      } else {
        specialiteControl?.clearValidators();
      }
      specialiteControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    console.log('Form submitted !');
    console.log(this.form.value);
    if (this.form.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      return;
    }

    const userData = this.form.value;
    if (userData.role !== 'medecin') {
      delete userData.specialite;
    }
    this.authService.register(userData).subscribe({
      next: (res) => {
        this.successMessage = 'Inscription réussie !';
        this.errorMessage = '';
        // Redirection après inscription réussie
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'inscription.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}
