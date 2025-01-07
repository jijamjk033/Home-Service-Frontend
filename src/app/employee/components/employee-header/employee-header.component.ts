import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employeeService.service';
import { NotificationSidebarComponent } from '../../../common/components/notification-sidebar/notification-sidebar.component';
import { NotificationService } from '../../../common/services/notification.service';

@Component({
  selector: 'app-employee-header',
  standalone: true,
  imports: [RouterModule, NgIf, NotificationSidebarComponent],
  templateUrl: './employee-header.component.html',
  styleUrl: './employee-header.component.css'
})
export class EmployeeHeaderComponent {
  isLoggedIn = false;
  hasUnreadNotifications = true;
  isSidebarOpen = false;
  constructor(private employeeService: EmployeeService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.employeeService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  toggleNotificationSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
      this.hasUnreadNotifications = false;
    }
  }

  logout() {
    this.employeeService.logout();
  }

}
