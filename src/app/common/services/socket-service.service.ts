import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  socket: Socket | null = null;
  private port = environment.serverPort;

  constructor() { }

  connect() {
    if (!this.socket) {
      this.socket = io(this.port);
      this.setupListeners();
    }
  }

  private setupListeners() {
    if (this.socket) {
      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket?.id);
        if (typeof window !== 'undefined' && window.localStorage) {
          const userId = localStorage.getItem('user_id');
          const employeeId = localStorage.getItem('employee_id');
          const idToRegister = userId || employeeId;
          if (idToRegister) {
            this.socket?.emit('register', idToRegister);
            console.log(`Registered with ID: ${idToRegister}`);
          } else {
            console.warn('User ID not found in local storage.');
          }
        } else {
          console.error('Window or localStorage is not available.');
        }
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    }
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}
