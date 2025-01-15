import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employeeService.service';
import { NotificationSidebarComponent } from '../../../common/components/notification-sidebar/notification-sidebar.component';
import { NotificationService } from '../../../common/services/notification.service';
import { Subscription } from 'rxjs';
import { SocketServiceService } from '../../../common/services/socket-service.service';

@Component({
  selector: 'app-employee-header',
  standalone: true,
  imports: [RouterModule, NgIf, NotificationSidebarComponent],
  templateUrl: './employee-header.component.html',
  styleUrl: './employee-header.component.css'
})
export class EmployeeHeaderComponent implements OnInit, OnDestroy{
  isLoggedIn = false;
  hasUnreadNotifications = true;
  isSidebarOpen = false;
  private loginStatusSubscription: Subscription | null = null;

  constructor(private employeeService: EmployeeService, private notificationService: NotificationService, private socketService: SocketServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.employeeService.isLoggedIn();
    this.loginStatusSubscription = this.employeeService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.socketService.connect();
      } else {
        this.socketService.disconnect();
      }
    });
  }

  toggleNotificationSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
      this.hasUnreadNotifications = false;
    }
  }

  ngOnDestroy(): void {
    this.loginStatusSubscription?.unsubscribe();
    this.socketService.disconnect();
  }

  logout() {
    this.employeeService.logout();
  }

}
