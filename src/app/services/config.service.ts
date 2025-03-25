import { Injectable } from '@angular/core';
import { AppConfig } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = AppConfig;

  constructor() { }

  getApiUrl(): string {
    return this.config.apiUrl;
  }

  getAppTitle(): string {
    return this.config.appTitle;
  }
}
