import { DatePipe, NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NotificationResponse } from '../../../User/models/notificationResponse';

@Component({
  selector: 'app-notification-sidebar',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './notification-sidebar.component.html',
  styleUrl: './notification-sidebar.component.css'
})

export class NotificationSidebarComponent implements OnInit {

  @Input() isSidebarOpen = false;
  notifications: NotificationResponse[] = [];
  private isConnected: boolean = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.on('gotNotification', (notification) => {
      console.log('Notification received:', notification);
      this.notifications.push(notification);
      alert(notification.message);
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['isSidebarOpen'] && this.isSidebarOpen && !this.isConnected) {
  //     this.initializeNotifications();
  //   }
  // }

  // private initializeNotifications() {
  //   const recipientId = this.getRecipientId();
  //   if (recipientId) {
  //     this.fetchNotifications(recipientId);
  //     this.subscribeToLiveNotifications();
  //     this.isConnected = true;
  //   } else {
  //     console.error('Recipient ID is not available');
  //   }
  // }

  // private getRecipientId(): string | null {
  //   if (typeof window !== 'undefined' && localStorage) {
  //     const userId = localStorage.getItem('userId');
  //     const employeeId = localStorage.getItem('employeeId');
  //     return userId || employeeId || null;
  //   }
  //   console.error('localStorage is not available');
  //   return null;
  // }

  // private fetchNotifications(recipientId: string): void {
  //   this.notificationService.fetchNotifications(recipientId).subscribe(
  //     (response) => {
  //       this.notifications = response.data;
  //     },
  //     (error) => {
  //       console.error('Error fetching notifications:', error);
  //     }
  //   );
  // }

  // private subscribeToLiveNotifications(): void {
  //   this.notificationService.getNotifications().subscribe(
  //     (notification) => {
  //       this.notifications.unshift(notification);
  //     },
  //     (error) => {
  //       console.error('Error receiving live notifications:', error);
  //     }
  //   );
  // }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
