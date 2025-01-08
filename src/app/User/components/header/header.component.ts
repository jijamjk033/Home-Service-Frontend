import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userService } from '../../services/userService';
import { NgIf } from '@angular/common';
import { NotificationSidebarComponent } from '../../../common/components/notification-sidebar/notification-sidebar.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf, NotificationSidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  isLoggedIn = false;
  isSidebarOpen = false;
  hasUnreadNotifications = true;

  constructor(private userService: userService) { }

  ngOnInit(): void {

    this.userService.isLoggedIn$.subscribe((status: boolean) => {
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
    this.userService.logout();
  }
}
