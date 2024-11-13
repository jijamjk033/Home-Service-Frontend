import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { AdminServices } from '../../../Admin/services/adminService';
import { EmployeeModel } from '../../models/employeeModel';
import { State, Store } from '@ngrx/store';
import { BookingState } from '../../../state/booking/booking.state';
import { setEmployeeId } from '../../../state/booking/booking.actions';

@Component({
  selector: 'app-employee-selection',
  standalone: true,
  imports: [RouterModule,NgFor],
  templateUrl: './employee-selection.component.html',
  styleUrl: './employee-selection.component.css'
})
export class EmployeeSelectionComponent {
  displayedEmployees: EmployeeModel[] = [];
  selectedEmployee: string = '';
  constructor(private adminService: AdminServices, private store:Store<BookingState>) { }

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

  onEmployeeSelected(employeeId: string) {
    this.selectedEmployee = employeeId;
    this.store.dispatch(setEmployeeId({employeeId:employeeId}));
  }
}
