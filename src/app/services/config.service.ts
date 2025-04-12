import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private baseUrl = 'http://localhost:8080/api';  // URL de ton backend

  constructor(private http: HttpClient) { }

  // Exemple d'une méthode pour récupérer les rendez-vous
  getAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/appointments`);
  }

  // Exemple pour ajouter un rendez-vous
  addAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments`, appointment);
  }

  // Exemple de login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  // Autres méthodes pour interagir avec ton backend...
}
