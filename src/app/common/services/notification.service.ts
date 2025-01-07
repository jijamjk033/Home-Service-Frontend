import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../User/models/userResponseModel';
import { NotificationData, NotificationResponse } from '../../User/models/notificationResponse';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  private notifications = new Subject<NotificationResponse>();
  private apiKey = environment.notificationApiUrl;
  private socket: Socket;
  private port = environment.serverPort;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.socket = io(this.port);
    this.listenToNotifications();
  }

  fetchNotifications(id: string): Observable<ResponseModel<NotificationResponse[]>> {
    return this.http.get<ResponseModel<NotificationResponse[]>>(`${this.apiKey}/${id}/notifications`);
  }

  sendNotification(event: string, data: NotificationData): void {
    this.socket.emit(event, data);
  }

  private listenToNotifications(): void {
    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });
    this.socket.on('gotNotification', (notification: NotificationResponse) => {
      this.notifications.next(notification);
      this.showToast(notification.message);
    });

    this.socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });
  }

  getNotifications(): Observable<NotificationResponse> {
    return this.notifications.asObservable();
  }

  private showToast(message: string): void {
    this.toastr.info(message, 'New Notification');
  }
}
