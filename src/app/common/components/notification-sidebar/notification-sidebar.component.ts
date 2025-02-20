import { DatePipe, NgFor } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
    if (this.isSidebarOpen && !this.isConnected) {
      this.initializeNotifications();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSidebarOpen'] && this.isSidebarOpen && !this.isConnected) {
      this.initializeNotifications();
    }
  }

  private initializeNotifications(): void {
    const recipientId = this.getRecipientId();
    if (recipientId) {
      this.fetchNotifications(recipientId);
      this.subscribeToLiveNotifications();
      this.isConnected = true;
    } else {
      console.error('Recipient ID is not available');
    }
  }

  private getRecipientId(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      const userId = localStorage.getItem('user_id');
      const employeeId = localStorage.getItem('employee_id');
      console.log('userId, employeeId', userId, employeeId);
      return userId || employeeId || null;
    }
    console.error('Recipient ID not found in localStorage');
    return null;
  }

  private fetchNotifications(recipientId: string): void {
    this.notificationService.fetchNotifications(recipientId).subscribe(
      (response) => {
        console.log(response.data);
        this.notifications = response.data.map(notification => ({
          ...notification,
          createdAt: new Date(notification.timestamp)
        }));
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  private subscribeToLiveNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (notification) => {
        this.notifications.unshift({
          ...notification,
          createdAt: new Date(notification.timestamp)
        });
      },
      (error) => {
        console.error('Error receiving live notifications:', error);
      }
    );
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}
