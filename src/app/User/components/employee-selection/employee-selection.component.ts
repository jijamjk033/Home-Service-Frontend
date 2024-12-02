import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { AdminServices } from '../../../Admin/services/adminService';
import { EmployeeModel } from '../../models/employeeModel';
import { State, Store } from '@ngrx/store';
import { BookingState } from '../../../state/booking/booking.state';
import { setEmployeeId } from '../../../state/booking/booking.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-selection',
  standalone: true,
  imports: [RouterModule, NgFor, FormsModule],
  templateUrl: './employee-selection.component.html',
  styleUrl: './employee-selection.component.css'
})
export class EmployeeSelectionComponent {
  displayedEmployees: EmployeeModel[] = [];
  paginatedEmployees: EmployeeModel[] = [];
  selectedEmployee: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  filterBy: string = '';
  constructor(private adminService: AdminServices, private store: Store<BookingState>) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.adminService.getEmployeesList().subscribe(
      (response) => {
        if (response) {
          this.displayedEmployees = response.data;
          this.totalPages = Math.ceil(
            this.displayedEmployees.length / this.itemsPerPage
          );
          this.updatePaginatedEmployees();
        }
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }

  updatePaginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployees = this.displayedEmployees.slice(
      startIndex,
      endIndex
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedEmployees();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEmployees();
    }
  }

  applyFilter() {
    if (this.filterBy === 'rating') {
      this.displayedEmployees.sort(
        (a, b) => b.rating - a.rating
      );
    } else if (this.filterBy === 'experience') {
      this.displayedEmployees.sort(
        (a, b) => b.yearsOfExperience - a.yearsOfExperience
      );
    }
    this.currentPage = 1;
    this.updatePaginatedEmployees();
  }

  onEmployeeSelected(employeeId: string) {
    this.selectedEmployee = employeeId;
    this.store.dispatch(setEmployeeId({ employeeId: employeeId }));
  }
}
