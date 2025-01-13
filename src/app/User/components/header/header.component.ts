import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userService } from '../../services/userService';
import { NgIf } from '@angular/common';
import { NotificationSidebarComponent } from '../../../common/components/notification-sidebar/notification-sidebar.component';
import { SocketServiceService } from '../../../common/services/socket-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf, NotificationSidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isSidebarOpen = false;
  hasUnreadNotifications = true;
  private loginStatusSubscription: Subscription | null = null;

  constructor(private userService: userService, private socketService: SocketServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.loginStatusSubscription = this.userService.isLoggedIn$.subscribe((status: boolean) => {
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
    this.userService.logout();
  }
}
