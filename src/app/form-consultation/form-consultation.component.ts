import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MedecinService } from '../services/medecin.service';
import { RendezVousService } from '../services/rendez-vous.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RendezVous } from '../rendez-vous.model';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

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
  imports: [ReactiveFormsModule, FormsModule],
  selector: 'app-form-consultation',
  templateUrl: './form-consultation.component.html',
  styleUrls: ['./form-consultation.component.css']
})
export class FormConsultationComponent implements OnInit {
  selectedFile: File | null = null;
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
      description: ['', Validators.required],
    });
  }

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
    const file = event.target.files[0];
    this.selectedFile = file ? file : null;
  }
  

  onSubmit(): void {
    console.log('Submit appelé');
  
    if (this.demandeRdvForm.invalid || !this.medecinId || !this.patientId) {
      console.log("Form validation failed");
      console.log("Form valid:", this.demandeRdvForm.valid);
      console.log("Medecin ID:", this.medecinId);
      console.log("Patient ID:", this.patientId);
      return;
      
    }
    const dateFormatted = this.formatDateForBackend(this.demandeRdvForm.get('date')?.value);
    const formData = new FormData();
    formData.append('date', dateFormatted);
    formData.append('description', this.demandeRdvForm.get('description')?.value);
    formData.append('medecinId', this.medecinId);
    if (this.selectedFile) {
      formData.append('document', this.selectedFile);
    }
    formData.append('patientId', this.patientId.toString());
    formData.append('statut', 'EN_ATTENTE');
  
    // Improved file handling
    if (this.selectedFile) {
      // Ensure file is not too large
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (this.selectedFile.size > maxSize) {
        console.error('File is too large');
        // Optionally show user an error message
        return;
      }
      formData.append('document', this.selectedFile, this.selectedFile.name);
    }
  
    console.log('Form data envoyé:', formData);
  
    this.rendezVousService.createRendezVous(formData).subscribe({
      next: (response: RendezVous) => {
        console.log('Rendez-vous créé avec succès !', response);
        this.router.navigate(['/patient-dashboard/confirmation']);
      },
      error: (error: any) => {
        console.error('Erreur lors de la création du rendez-vous', error);
        const errorMessage = error.error?.message || 'Une erreur est survenue';
        alert(errorMessage); // Optionnel : afficher l'erreur à l'utilisateur
      }
    });}
    
    formatDateForBackend(date: string): string {
      const parsedDate = new Date(date);  // Convertir la date du formulaire en objet Date
      return parsedDate.toISOString().slice(0, -1);  
    }}