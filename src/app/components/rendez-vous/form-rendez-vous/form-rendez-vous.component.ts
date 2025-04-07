import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-rendez-vous',
  templateUrl: './form-rendez-vous.component.html',
  styleUrls: ['./form-rendez-vous.component.css']
})
export class FormRendezVousComponent {
  rendezVousForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rendezVousForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.rendezVousForm.valid) {
      console.log(this.rendezVousForm.value);
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
  }
}
