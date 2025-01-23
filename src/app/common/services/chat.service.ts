import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../User/models/userResponseModel';
import { chatResponse } from '../../User/models/chatResponseModel';
import { SocketServiceService } from './socket-service.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiKey = import.meta.env.NG_APP_CHAT_API_URL;
  constructor(private http: HttpClient, private socketService: SocketServiceService) {}

  initiateChat(userId: string, employeeId: string): Observable<ResponseModel<chatResponse>> {
    return this.http.post<ResponseModel<chatResponse>>(`${this.apiKey}/initiate`, { userId, employeeId });
  }

  getMessages(chatId: string): Observable<ResponseModel<chatResponse[]>> {
    return this.http.get<ResponseModel<chatResponse[]>>(`${this.apiKey}/${chatId}/chatRoomMessages`);
  }

  // Socket.io methods
  joinChat(chatId: string): void {
    this.socketService.socket?.emit('joinChat', chatId);
  }

  sendMessage(chatId: string, message: string, sender: string): void {
    this.socketService.socket?.emit('sendMessage', { chatId, message, sender });
  }

  onNewMessage(callback: (message: any) => void): void {
    this.socketService.socket?.on('newMessage', callback);
  }

}
