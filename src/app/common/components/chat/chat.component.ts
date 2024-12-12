import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule,NgIf],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  isOpen = true;
  messages: { text: string; isOutgoing: boolean; timestamp: string }[] = [];
  newMessage = '';
  chatId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.chatId = this.route.snapshot.paramMap.get('id') || '';
    if (this.chatId) {
      this.chatService.joinChat(this.chatId);
      this.fetchMessages();
      this.listenForNewMessages();
    }
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const sender = typeof window !== 'undefined' && (localStorage.getItem('user_id') || localStorage.getItem('employee_id'));
      console.log('I am sending the message',sender, this.newMessage);
      if (!sender) {
        console.error('Error: No sender ID found in localStorage.');
        return;
      }
      this.chatService.sendMessage(this.chatId, this.newMessage, sender);
      this.newMessage = '';
    }
  }

  fetchMessages() {
    this.chatService.getMessages(this.chatId).subscribe({
      next: (response) => {
        if (response && response.data) {
          const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
          const employeeId = typeof window !== 'undefined' ? localStorage.getItem('employee_id') : null;
          console.log('Fetched userId:', userId);
          console.log('Fetched employeeId:', employeeId);
          this.messages = response.data.map(msg => {
            const isOutgoing = msg.sender === userId || msg.sender === employeeId;
            console.log('Processing message:', msg.text, 'isOutgoing:', isOutgoing);
            return {
              text: msg.text,
              isOutgoing,
              timestamp: new Date(msg.timestamp).toLocaleTimeString(),
            };
          });
        }
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
      }
    });
  }

  listenForNewMessages(): void {
    this.chatService.onNewMessage((message) => {
      let userId = null;
      let employeeId = null;
      if (typeof window !== 'undefined') {
        userId = localStorage.getItem('user_id');
        employeeId = localStorage.getItem('employee_id');
      }
      this.messages.push({
        text: message.text,
        isOutgoing: message.sender === userId || message.sender === employeeId,
        timestamp: new Date(message.timestamp).toLocaleTimeString(),
      });
      this.toastr.info('You have a new message',message.text, {
        toastClass: 'ngx-toastr custom-toaster',
      });
    });
  }
  
  
  closeChat() {
    this.isOpen = false;
    this.router.navigate(['/']);
  }
}
