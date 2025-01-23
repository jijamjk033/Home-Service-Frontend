import { Injectable, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../User/models/userResponseModel';
import { NotificationData, NotificationResponse } from '../../User/models/notificationResponse';
import { SocketServiceService } from './socket-service.service';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  private notifications = new Subject<NotificationResponse>();
  private apiKey = environment.notificationApiUrl;

  constructor(private http: HttpClient, private zone: NgZone, private toastr: ToastrService, private socketService: SocketServiceService) {
    this.socketService.socket?.on('connect', () => {
      console.log('Socket connected:', this.socketService.socket?.id);
      this.listenToNotifications();
    });
  }

  fetchNotifications(id: string): Observable<ResponseModel<NotificationResponse[]>> {
    return this.http.get<ResponseModel<NotificationResponse[]>>(`${this.apiKey}/${id}/notifications`);
  }

  sendNotification(event: string, data: NotificationData): void {
    this.socketService.socket?.emit(event, data);
  }

  private listenToNotifications(): void {
    this.socketService.socket?.on('gotNotification', (notification: NotificationResponse) => {
      this.zone.run(() => {
        console.log('Notification recieved in the recipient side', notification);
        this.notifications.next(notification);
        this.showToast(notification.message);
      });
    });
    this.socketService.socket?.on('connect_error', (err) => {
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
