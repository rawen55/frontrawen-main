import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  private baseUrl = 'http://localhost:8080/api/medecins';

  constructor(private http: HttpClient) {}

  // Récupérer tous les médecins
  getAllMedecins(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Récupérer un médecin par ID
  getMedecinById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Rechercher des médecins par nom ou spécialité (si l’API le supporte)
  searchMedecins(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search?q=${query}`);
  }

  // Ajouter un médecin
  addMedecin(medecin: any): Observable<any> {
    return this.http.post(this.baseUrl, medecin);
  }

  // Modifier un médecin
  updateMedecin(id: number, medecin: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, medecin);
  }

  // Supprimer un médecin
  deleteMedecin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
