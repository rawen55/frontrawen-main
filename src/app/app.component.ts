import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';



@Component({
  imports: [RouterOutlet, RouterModule],
  selector: 'app-root',
  standalone: true,
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
goToLogin() {
throw new Error('Method not implemented.');
}
  title = 'telemedecine-frontend';
  
}
