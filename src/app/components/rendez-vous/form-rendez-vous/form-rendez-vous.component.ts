import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-form-rendez-vous',
  templateUrl: './form-rendez-vous.component.html',
  styleUrls: ['./form-rendez-vous.component.css']
})
export class FormRendezVousComponent {
  rendezVousForm: FormGroup;
  nomMedecin: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.rendezVousForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      medecin: [''] // champ pour afficher le nom du médecin
    });

    this.route.queryParams.subscribe(params => {
      this.nomMedecin = params['nomMedecin'] || '';
      this.rendezVousForm.patchValue({ medecin: this.nomMedecin });
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
