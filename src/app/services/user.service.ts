import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { config } from '../config/config'; 
import { UserProfile } from '../src/app/models/userprofil'; // Adjusted the path to match the correct file

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user'; // adapte le chemin selon ton backend

  constructor(private http: HttpClient) {}
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  
  getUserProfile(): Observable<any> {
    const patientId = localStorage.getItem('patientId'); // Retrieve the patient ID from localStorage
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!patientId) {
      throw new Error('Patient ID not found in localStorage');
    }
    if (!token) {
      throw new Error('Token not found in localStorage');
    }
    const url = `${this.apiUrl}/profile?patientId=${patientId}`; // Add patientId as a query parameter
    const headers = { Authorization: `Bearer ${token}` }; // Add the Authorization header
    return this.http.get<any>(url, { headers });
  }

  getCurrentUser(): Observable<any> {
    const patientId = localStorage.getItem('patientId');
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!patientId) {
     
      throw new Error('Patient ID not found in localStorage');
    }
    const url = `${this.apiUrl}/me?patientId=${patientId}`;
    const headers = { Authorization: `Bearer ${token}` }; // Add the Authorization header
    return this.http.get<any>(url, { headers });
    
 
  }
  getUserInfoFromToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
  uploadProfilePhoto(userId: number, file: File): Observable<UserProfile> {
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in localStorage');
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    console.log('FormData content:', formData.get('file')); // Log the file
    console.log('Token:', token); // Log the token
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


  
    console.log('Authorization header:', headers.get('Authorization')); // Debug log
    
    return this.http.post<UserProfile>(`${this.apiUrl}/${userId}/photo/upload`, formData, { headers });
  }
}