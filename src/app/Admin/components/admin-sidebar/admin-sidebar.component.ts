import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AdminCategoriesComponent } from '../admin-categories/admin-categories.component';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterModule,UserListComponent,EmployeeListComponent,AdminDashboardComponent,AdminCategoriesComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

}
