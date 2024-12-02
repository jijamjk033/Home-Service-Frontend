import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  isOpen = true; 
  messages = [
    { text: 'Hello! How can I help you?', isOutgoing: false },
    { text: 'I want to know more about your service.', isOutgoing: true },
  ];
  newMessage = '';

  constructor(private router: Router) {}

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, isOutgoing: true });
      this.newMessage = '';
    }
  }

  closeChat() {
    this.isOpen = false;
    this.router.navigate(['/']);
  }
}
