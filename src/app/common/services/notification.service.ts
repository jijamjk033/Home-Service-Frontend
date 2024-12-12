import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { io, Socket  } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  private notifications = new Subject<any>();

  constructor(private socket: Socket, private toastr: ToastrService) {
    this.listenToNotifications();
  }

  sendNotification(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  private listenToNotifications(): void {
    this.socket.on('notification', (notification: any) => {
      this.notifications.next(notification);
      this.showToast(notification.message);
    });
  }

  getNotifications(): Observable<any> {
    return this.notifications.asObservable();
  }

  private showToast(message: string): void {
    this.toastr.info(message, 'New Notification');
  }
}
