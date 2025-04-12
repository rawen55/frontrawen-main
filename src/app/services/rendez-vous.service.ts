import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = 'https://api.exemple.com/rendezvous'; // Changez l'URL pour votre API

  constructor(private http: HttpClient) {}

  getAllRendezVous(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  rescheduleRendezVous(id: number, newDate: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { newDate });
  }

  acceptRendezVous(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accept/${id}`, {});
  }

  rejectRendezVous(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reject/${id}`, {});
  }
}

