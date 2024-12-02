import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserData } from '../../interfaces/userInterface';
import { userService } from '../../services/userService';
import { FormsModule } from '@angular/forms';
import { AddressManagementComponent } from '../address-management/address-management.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,FormsModule, AddressManagementComponent,RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userData!: UserData;

  constructor(private userService: userService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.userService.getUserDataByEmail(userId).subscribe(
        {
          next: (response) => {
            if (response) {
              this.userData = response.data;
              
            }
          },
          error: (error) => {
            console.error('Error fetching user data:', error);
          }
        }
      );
    } else {
      console.error('No user ID found in local storage.');
    }
  }

  saveProfile(): void {

  }
}

