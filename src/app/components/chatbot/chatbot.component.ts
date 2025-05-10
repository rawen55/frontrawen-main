import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }
  

  messages: { sender: string, text: string }[] = [];
  userInput = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const message = this.userInput;
    this.messages.push({ sender: 'patient', text: message });
    this.userInput = '';

    this.http.post<any>('http://localhost:8080/api/chatbot/ask', { message }).subscribe(
      res => {
        this.messages.push({ sender: 'bot', text: res.response });
      },
      err => {
        this.messages.push({ sender: 'bot', text: "Erreur de communication avec le serveur." });
      }
    );
    
  }
}
