import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { RouterModule } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { AdminServices } from '../../services/adminService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [AdminSidebarComponent,RouterModule,UserListComponent,EmployeeListComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  constructor(
    private adminService : AdminServices,
    private toaster: ToastrService,
  ) {}

  logout(): void {
    this.adminService.logout();
    this.toaster.success('Logout Successfully', 'Success');
  }
}
