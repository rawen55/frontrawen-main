import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../rendez-vous.model';

// Ton modèle Medecin
export class Medecin {
  id!: number;
  nom!: string;
  prenom!: string;
  email!: string;
  specialite!: string;
}


@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  getMedecinById(id: number): Observable<{ prenom: string; nom: string }> {
    // Replace with actual HTTP call or logic
    return this.http.get<{ prenom: string; nom: string }>(`/api/medecins/${id}`);
  }
  private apiUrl = 'http://localhost:8080/api/medecin';

  constructor(private http: HttpClient) {}

  getAllMedecins(): Observable<Medecin[]> {
    const token = localStorage.getItem('token'); // récupère ton token stocké
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Medecin[]>(this.apiUrl, { headers });
  }
}