import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './notification-sidebar.component.html',
  styleUrl: './notification-sidebar.component.css'
})

export class NotificationSidebarComponent implements OnInit{
  
  @Input() isSidebarOpen = false;
  notifications = ['You have a new booking!', 'Your booking was accepted!', 'You have a new message.'];

  constructor(){}

  ngOnInit(): void {

  }

  closeSidebar() {
      this.isSidebarOpen = false;
  }
}
