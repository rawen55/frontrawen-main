import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionnaireComponent } from '../../questionnaire/questionnaire.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, QuestionnaireComponent],
  standalone: true,
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {
  loading: boolean = true;
  description: string = '';
  documents: Array<{ nom: string, url: string }> = [];
  notesPreconsultation: string = '';
  patientId: number | null = null;
  questionnaireData: any = null;
  extractedText: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const rendezvousId = id ? parseInt(id, 10) : null;
      if (rendezvousId) {
        this.loadPatientDossierMedicale(rendezvousId);
      } else {
        console.error('Aucun rendez-vous sélectionné.');
        this.loading = false;
      }
    });
  }

  getPatientId(): number | null {
    const patientId = localStorage.getItem('patientId');
    return patientId ? parseInt(patientId, 10) : null;
  }

  loadPatientDossierMedicale(rendezvousId: number): void {
    this.loading = true;
    this.http.get(`http://localhost:8080/api/rendezvous/${rendezvousId}/dossier-medicale`, { responseType: 'text' })
      .subscribe({
        next: (text) => {
          console.log('Extracted text from backend:', text); // Log the extracted text
          this.extractedText = text;

          // If questionnaire data is JSON inside the text, parse it
          const jsonStart = text.indexOf('{');
          const jsonEnd = text.lastIndexOf('}');
          if (jsonStart !== -1 && jsonEnd !== -1) {
            const jsonString = text.substring(jsonStart, jsonEnd + 1);
            try {
              this.questionnaireData = JSON.parse(jsonString);
            } catch (e) {
              console.error('Erreur lors du parsing JSON du texte:', e);
              this.questionnaireData = null;
            }
          } else {
            this.questionnaireData = null;
          }

          this.loading = false;
        },
        error: err => {
          console.error('Erreur lors du chargement du dossier médical :', err);
          this.loading = false;
        }
      });
  }

  savePreconsultation(): void {
    const payload = {
      notes: this.notesPreconsultation
    };
    this.http.post(`http://localhost:8080/api/patient/${this.patientId}/preconsultation/notes`, payload)
      .subscribe({
        next: () => {
          console.log('Notes de préconsultation enregistrées avec succès.');
        },
        error: err => {
          console.error('Erreur lors de l\'enregistrement des notes :', err);
        }
      });
  }
}