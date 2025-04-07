import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['patient', Validators.required], // patient par défaut
      speciality: ['', Validators.required]  // Spécialité, ajoutée pour médecin
    });
    this.form.get('role')?.valueChanges.subscribe(role => {
      const specialityControl = this.form.get('speciality');
      if (role === 'medecin') {
        specialityControl?.setValidators([Validators.required]);
      } else {
        specialityControl?.clearValidators();
      }
      specialityControl?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form values', this.form.value);
      // Logique de soumission à l'API ici
      this.router.navigate(['/login']);
    }
  }
}
