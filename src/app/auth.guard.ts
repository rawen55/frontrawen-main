// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const role = localStorage.getItem('role');
    
    if (role === 'medecin') {
      return true; // Allow access to the dashboard if the user is a "medecin"
    } else {
      this.router.navigate(['/unauthorized']); // Redirect to unauthorized page if not a "medecin"
      return false;
    }
  }
}
