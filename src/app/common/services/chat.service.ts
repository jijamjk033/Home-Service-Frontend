import { Injectable } from '@angular/core';
import { environment } from '../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../User/models/userResponseModel';
import { chatResponse } from '../../User/models/chatResponseModel';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiKey = environment.chatApiUrl;
  private port = environment.serverPort;
  private socket: Socket;
  constructor(private http: HttpClient) {
    this.socket = io(this.port);
  }

  initiateChat(userId: string, employeeId: string): Observable<ResponseModel<chatResponse>> {
    return this.http.post<ResponseModel<chatResponse>>(`${this.apiKey}/initiate`, { userId, employeeId });
  }

  getMessages(chatId: string): Observable<ResponseModel<chatResponse[]>> {
    return this.http.get<ResponseModel<chatResponse[]>>(`${this.apiKey}/${chatId}/chatRoomMessages`);
  }

  // Socket.io methods
  joinChat(chatId: string): void {
    this.socket.emit('joinChat', chatId);
  }

  sendMessage(chatId: string, message: string, sender: string): void {
    this.socket.emit('sendMessage', { chatId, message, sender });
  }

  onNewMessage(callback: (message: any) => void): void {
    this.socket.on('newMessage', callback);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
