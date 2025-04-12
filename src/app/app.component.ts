import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
goToLogin() {
throw new Error('Method not implemented.');
}
  title = 'telemedecine-frontend';
}
