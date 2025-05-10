import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HeaderComponent],
 
})
export class HomeComponent {
  ngOnInit() {
    const text = 'Simplifiez vos rendez-vous médicaux';
    let index = 0;
    const speed = 100;
    const target = document.getElementById('typewriter');
  
    function type() {
      if (index < text.length && target) {
        target.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }
  
    type();
  }
  
}