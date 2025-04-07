import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  private apiUrl = '/api/rendezvous';  // Assurez-vous que cette URL correspond à votre backend

  constructor(private http: HttpClient) {}

  createRendezvous(rendezvousData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, rendezvousData);
  }

  getRendezvousByPatient(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient/${patientId}`);
  }

  getRendezvousByMedecin(medecinId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/medecin/${medecinId}`);
  }

  updateRendezvous(rendezvousId: string, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${rendezvousId}`, updateData);
  }
}

