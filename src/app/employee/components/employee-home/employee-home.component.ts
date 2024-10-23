import { Component } from '@angular/core';
import { EmployeeHeaderComponent } from '../employee-header/employee-header.component';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [EmployeeHeaderComponent,EmployeeSidebarComponent,RouterModule],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent {

}
