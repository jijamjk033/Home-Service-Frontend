import { Component } from '@angular/core';
import { AdminServices } from '../../services/adminService';
import { UserModel } from '../../../User/models/userModel';
import { NgIf } from '@angular/common';
import { TableComponent } from '../../../common/components/table/table.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgIf,TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  pageTitle = 'User List'

  tableHeaders = ['Name','Phone Number','email','Status'];
  headerKeys = ['name', 'phone', 'email', 'status'];

  users: UserModel[] = [];
  displayedUsers: UserModel[] = [];

  constructor( private adminService: AdminServices){}

  ngOnInit(): void {
    this.getUserList(); 
  }

  getUserList() {
    
    this.adminService.getUsersList().subscribe((response) => {
      if (response) {
        this.users = response.data; 
        
        this.displayedUsers = response.data;
      } 
    }, error => {
      console.error('API error:', error);
    });
  }
  
}
