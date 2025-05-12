import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../rendez-vous.model';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  
  private apiUrl = 'http://localhost:8080/api/rendezvous'; // Ton endpoint backend
  headers: HttpHeaders | Record<string, string | string[]> | undefined;

  constructor(private http: HttpClient) {}

  getNewConsultations(): Observable<number> {
    // Replace with the correct backend endpoint to fetch new consultations
    return this.http.get<number>(`${this.apiUrl}/medecin/new-consultations`);
  }

  // Pour créer un rendez-vous
  createRendezVous(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    console.log("Form data envoyé : ", formData); // Vérifier le contenu des données envoyées
  
    return this.http.post<RendezVous>('http://localhost:8080/api/rendezvous/create', formData, { headers });
  }
  getRendezVousByMedecinId(medecinId: number): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`http://localhost:8080/api/rendezvous/medecin/${medecinId}/rendezvous`);

  }
  updateStatutRendezVous(id: number, statut: string): Observable<RendezVous> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
    });
  
    return this.http.put<RendezVous>(
      `${this.apiUrl}/${id}/statut`,
      { statut },
      { headers }
    );
  }
  
  getWeeklyStats(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>('http://localhost:8080/api/rendezvous/stats/weekly', { headers });
  }

  getMonthlyStats(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>('http://localhost:8080/api/rendezvous/stats/monthly', { headers });
  }
  getYearlyStats(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any>('http://localhost:8080/api/rendezvous/stats/yearly', { headers });
  }

  supprimerRendezVous(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

savePreconsultation(rdvId: number, notes: string): Observable<any> {
  return this.http.post(`/api/preconsultations`, { rdvId, notes });
}
acceptRendezVous(rdvId: number): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}/rendezvous/${rdvId}/accept`, {});
}
getDocumentsByRendezVous(rendezvousId: number): Observable<Document[]> {
  const url = `${this.apiUrl}/documents/rendezvous/${rendezvousId}`;
  return this.http.get<Document[]>(url);
}
rejectRendezVous(rdvId: number): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}/rendezvous/${rdvId}/reject`, {});
}

reportRendezVous(rdvId: number, newDate: string): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}/rendezvous/${rdvId}/report`, { newDate });
}
getRendezVousById(rdvId: number): Observable<any> {
  const url = `${this.apiUrl}/rendezvous/${rdvId}`;
  return this.http.get(url);
}

getRendezVousForLoggedMedecin(): Observable<RendezVous[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Récupère l'ID du médecin à partir du token JWT ou du stockage local
  const medecinId = this.getMedecinIdFromToken(token);

  return this.http.get<RendezVous[]>(`${this.apiUrl}/medecin/${medecinId}`, { headers });
}
private getMedecinIdFromToken(token: string | null): string {
  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Décodage du token réussi :', decodedToken);

      if (decodedToken.userId) {
        return decodedToken.userId.toString(); // <-- ici on retourne l'id
      } else {
        console.error('L\'ID de l\'utilisateur n\'est pas dans le token');
      }
    } catch (e) {
      console.error('Erreur de décodage du token JWT :', e);
    }
  }
  return '';
}
getRendezVousByPatientId(patientId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/patient/${patientId}`);
}
getMedecinStats(medecinId: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<any>(`http://localhost:8080/api/rendezvous/medecin/${medecinId}/stats`, { headers });
}
}
