import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userService } from '../../services/userService';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private userService: userService) {}

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.userService.logout();
  }

}
