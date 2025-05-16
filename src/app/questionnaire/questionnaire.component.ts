import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicalRecordService } from '../services/medical-record.service';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnChanges {
  medicalForm: FormGroup;

  @Input() formData: any;

  constructor(
    private fb: FormBuilder,
    private medicalService: MedicalRecordService
  ) {
    this.medicalForm = this.fb.group({
      patientInfo: this.fb.group({
        sexe: [''],
        dateNaissance: [''],
        lieuNaissance: [''],
        adresse: [''],
        telephone: ['', [Validators.pattern(/^\+?\d{10,15}$/)]],
        email: ['', [Validators.email]],
        groupeSanguin: [''],
        couvertureSociale: [''],
        numeroSecuriteSociale: [''],
        profession: [''],
        etatCivil: ['']
      }),
      antecedentsMedicaux: this.fb.group({
        personnels: this.fb.group({
          diabete: [false],
          hta: [false],
          maladiesCardiaques: [false],
          asthme: [false],
          allergies: [''],
          chirurgies: [''],
          medicaments: [''],
          psychiatriques: [''],
          maladiesChronique: ['']
        }),
        familiaux: this.fb.group({
          maladiesHereditaires: ['']
        })
      }),
      modeDeVie: this.fb.group({
        tabac: this.fb.group({
          actif: [false],
          quantite: ['']
        }),
        alcool: this.fb.group({
          actif: [false],
          frequence: ['']
        }),
        activitePhysique: this.fb.group({
          actif: [false],
          frequence: ['']
        }),
        alimentation: [''],
        sommeil: [''],
        stress: ['']
      }),
      examensBiologiques: this.fb.group({
        glycemie: [''],
        tensionArterielle: [''],
        cholesterol: [''],
        creatinine: [''],
        bilanHepatique: [''],
        autres: ['']
      }),
      santeMentale: this.fb.group({
        humeur: [''],
        anxiete: [''],
        depression: [''],
        evaluation: ['']
      }),
      consentements: this.fb.group({
        consentementEclaire: [false],
        representantLegal: [''],
        contactUrgence: ['']
      })
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.formData) {
      this.medicalForm.patchValue(this.formData);
      console.log('Form populated with data:', this.medicalForm.value); // Debug log
    }
  }

  onSubmit() {
    if (this.medicalForm.valid) {
      this.medicalService.submitMedicalRecord(this.medicalForm.value).subscribe({
        next: response => console.log('Succès :', response),
        error: error => console.error('Erreur :', error)
      });
    } else {
      console.log('Form is invalid:', this.medicalForm.errors);
    }
  }

  getMedicalFormData(): any {
    return this.medicalForm.value;
  }
}