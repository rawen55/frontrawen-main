import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MedecinService } from '../../../services/medecin.service';
import { RendezVousService } from '../../../services/rendez-vous.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RendezVous } from '../../../rendez-vous.model';
import { AuthService } from '../../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { QuestionnaireComponent } from '../../../questionnaire/questionnaire.component';
import { jsPDF } from 'jspdf';
import { ViewChild } from '@angular/core';


// Define an interface for the JWT payload
interface JwtPayload {
  userId?: number;
  id?: number;
  patientId?: number;
  role: string;
  sub: string;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, QuestionnaireComponent],
  selector: 'app-form-rendez-vous',
  templateUrl: './form-rendez-vous.component.html',
  styleUrls: ['./form-rendez-vous.component.css']
})
export class FormRendezVousComponent implements OnInit {
  selectedFiles: File[] = [];
  demandeRdvForm: FormGroup;
  medecinId: string | null = null;
  patientId: number | null = null;
  NomMedecin:  string = '';

  constructor(
    private medecin: MedecinService,
    private rendezVous: RendezVousService,
    private fb: FormBuilder,
    private rendezVousService: RendezVousService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.demandeRdvForm = this.fb.group({
      date: ['', Validators.required],
    });
  }
  
  @ViewChild(QuestionnaireComponent)
  questionnaireComponent!: QuestionnaireComponent;

  ngOnInit(): void {
    // Extract Medecin ID from route
    this.route.paramMap.subscribe(params => {
      this.medecinId = params.get('medecinId');
      console.log('Medecin ID:', this.medecinId);
  
      // Récupérer les informations du médecin
      if (this.medecinId) {
        this.getMedecinDetails(this.medecinId);
      }
    });
  
    // Extract Patient ID from token
    this.extractPatientId();
  }
  
  // Nouvelle méthode pour récupérer les détails du médecin
  private getMedecinDetails(medecinId: string): void {
    this.medecin.getMedecinById(Number(medecinId)).subscribe({
      next: (medecin: { prenom: string; nom: string }) => {
        this.NomMedecin = `${medecin.prenom} ${medecin.nom}`; // Combine prénom et nom
        console.log('Médecin actuel:', this.NomMedecin);
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des détails du médecin', error);
      }
    });
  }
 
  private extractPatientId(): void {
    try {
      // Get token from AuthService
      const token = this.authService.getToken();
      
      if (!token) {
        console.warn('No token found');
        return;
      }

      // Decode the token
      const decodedToken = jwtDecode<JwtPayload>(token);
      console.log('Decoded Token:', decodedToken);

      // Try multiple possible keys for patient/user ID
      this.patientId = decodedToken.userId || 
                       decodedToken.id || 
                       decodedToken.patientId || 
                       null;

      console.log('Extracted Patient ID:', this.patientId);

      // Additional validation
      if (!this.patientId) {
        console.warn('Could not extract patient ID from token');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      this.patientId = null;
    }
  }

  demanderRendezVous(medecin: any) {
    this.router.navigate(['/form-rendez-vous', medecin.id]);
  }
  onFileSelected(event: any) {
  const files: FileList = event.target.files;
  this.selectedFiles = [];
  for (let i = 0; i < files.length; i++) {
    this.selectedFiles.push(files[i]);
  }
}
  

  async onSubmit(): Promise<void> {
    console.log('Submit appelé');
  
    if (this.demandeRdvForm.invalid || !this.medecinId || !this.patientId) {
      console.log("Form validation failed");
      return;
    }

    // 1. Get questionnaire data
    const questionnaireData = this.questionnaireComponent.getMedicalFormData();

    // 2. Generate PDF from questionnaire data
    const pdf = new jsPDF();
    pdf.text('Dossier Médical', 10, 10);
    pdf.text(JSON.stringify(questionnaireData, null, 2), 10, 20); // Simple formatting

    // 3. Convert PDF to Blob and File
    const pdfBlob = pdf.output('blob');
    const dossierMedicaleFile = new File([pdfBlob], 'dossier_medicale.pdf', { type: 'application/pdf' });

    // 4. Prepare FormData
    const dateFormatted = this.formatDateForBackend(this.demandeRdvForm.get('date')?.value);
    const formData = new FormData();
    formData.append('date', dateFormatted);
    formData.append('medecinId', this.medecinId);
    formData.append('patientId', this.patientId.toString());
    formData.append('statut', 'EN_ATTENTE');

    // 5. Append dossier médicale PDF
    formData.append('dossierMedicale', dossierMedicaleFile);

    // 6. Append all selected files
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file) => {
        formData.append('documents', file, file.name);
      });
    }

    // 7. Submit
    this.rendezVousService.createRendezVous(formData).subscribe({
      next: (response: RendezVous) => {
        console.log('Rendez-vous créé avec succès !', response);
        this.router.navigate(['/confirmation']);
      },
      error: (error: any) => {
        console.error('Erreur lors de la création du rendez-vous', error);
        const errorMessage = error.error?.message || 'Une erreur est survenue';
        alert(errorMessage);
      }
    });
  }
    
    formatDateForBackend(date: string): string {
      const parsedDate = new Date(date);  // Convertir la date du formulaire en objet Date
      return parsedDate.toISOString().slice(0, -1);  
    }}