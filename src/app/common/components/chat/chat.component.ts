import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ToastrService } from 'ngx-toastr';
import { SocketServiceService } from '../../services/socket-service.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, NgIf],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  @ViewChild('chatMessages') chatMessages!: ElementRef;
  @Input() isOpen: boolean = false;
  @Input() chatId!: string;
  @Output() closeChat = new EventEmitter<void>();
  messages: { text: string; isOutgoing: boolean; timestamp: string }[] = [];
  newMessage = '';

  constructor(
    private chatService: ChatService,
    private toastr: ToastrService,
    private socketService: SocketServiceService) { }

  ngOnInit(): void {
    if (this.chatId) {
      this.chatService.joinChat(this.chatId);
      this.fetchMessages();
      this.listenForNewMessages();
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.chatMessages) {
      setTimeout(() => {
        console.log('Scrolling to bottom...');
        const element = this.chatMessages.nativeElement;
        element.scrollTop = element.scrollHeight;
      }, 0); 
    }
  }
  

  sendMessage() {
    if (this.newMessage.trim()) {
      const sender = typeof window !== 'undefined' && (localStorage.getItem('user_id') || localStorage.getItem('employee_id'));
      console.log('I am sending the message', sender, this.newMessage);
      if (!sender) {
        console.error('Error: No sender ID found in localStorage.');
        return;
      }
      this.chatService.sendMessage(this.chatId, this.newMessage, sender);
      this.newMessage = '';
      this.scrollToBottom();
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
          this.scrollToBottom();
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
      this.toastr.info('You have a new message', message.text, {
        toastClass: 'ngx-toastr custom-toaster',
      });
      this.scrollToBottom();
    });
  }


  close(): void {
    this.closeChat.emit();
  }
}
