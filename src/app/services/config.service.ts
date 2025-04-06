import { Injectable } from '@angular/core';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = config;

  constructor() { }

  getApiUrl(): string {
    return this.config.apiUrl;
  }

  getAppTitle(): string {
    return this.config.appTitle;
  }
}
