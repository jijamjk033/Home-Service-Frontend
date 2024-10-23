import { Component } from '@angular/core';
import { TableComponent } from '../../../common/components/table/table.component';
import { EmployeeModel } from '../../../User/models/employeeModel';
import { AdminServices } from '../../services/adminService';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  pageTitle = 'Employee List';

  tableHeaders = ['Name','Phone Number','email','Role','Experience'];
  headerKeys = ['name', 'phone', 'email','role', 'yearsOfExperience'];

  employees: EmployeeModel[] = [];
  displayedEmployees: EmployeeModel[] = [];

  constructor( private adminService: AdminServices){}

  ngOnInit(): void {
    this.getEmployeeList(); 
  }

  getEmployeeList() {
    
    this.adminService.getEmployeesList().subscribe((response) => {
      if (response) {
        this.employees = response.data;  
        
        this.displayedEmployees = response.data;
      } 
    }, error => {
      console.error('API error:', error);
    });
  }

}
