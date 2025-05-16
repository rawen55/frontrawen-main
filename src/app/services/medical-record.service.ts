import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  private apiUrl = 'http://localhost:8080/api/medical-record'; // à adapter selon ton backend

  constructor(private http: HttpClient) {}

  submitMedicalRecord(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
