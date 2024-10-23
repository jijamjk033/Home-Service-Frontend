import { Component } from '@angular/core';
import { TableComponent } from '../../../../common/components/table/table.component';
import { AdminServices } from '../../../../Admin/services/adminService';
import { EmployeeModel } from '../../../models/employeeModel';

@Component({
  selector: 'app-employee-selection',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './employee-selection.component.html',
  styleUrl: './employee-selection.component.css'
})
export class EmployeeSelectionComponent {
  tableHeaders = ['Name','Rating','Experience', 'Action'];
  headerKeys = ['name','rating', 'yearsOfExperience'];

  displayedEmployees: EmployeeModel[] = [];

  constructor( private adminService: AdminServices){}

  ngOnInit(): void {
    this.getEmployeeList(); 
  }

  getEmployeeList() {
    
    this.adminService.getEmployeesList().subscribe((response) => {
      if (response) { 
        this.displayedEmployees = response.data;
      } 
    }, error => {
      console.error('API error:', error);
    });
  }
}
