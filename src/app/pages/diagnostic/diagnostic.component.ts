import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [CommonModule, FormsModule],
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
  patientId: number | null = null; // ID du patient sélectionné

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.patientId = this.getPatientId(); // Récupérer l'ID du patient (par exemple, depuis localStorage ou une route)
    if (this.patientId) {
      this.loadPatientData(this.patientId);
    } else {
      console.error('Aucun patient sélectionné.');
      this.loading = false;
    }
  }

  getPatientId(): number | null {
    // Exemple : récupérer l'ID du patient depuis localStorage ou une autre source
    const patientId = localStorage.getItem('patientId');
    return patientId ? parseInt(patientId, 10) : null;
  }

  loadPatientData(patientId: number): void {
    this.loading = true;
    this.http.get<any>(`http://localhost:8080/api/patient/${patientId}/preconsultation`)
      .subscribe({
        next: data => {
          this.description = data.description;
          this.documents = data.documents;
          this.loading = false;
        },
        error: err => {
          console.error('Erreur lors du chargement des données du patient :', err);
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