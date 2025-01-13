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
