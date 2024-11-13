import { Component, OnInit } from '@angular/core';
import { userService } from '../../services/userService';
import { EmployeeService } from '../../../employee/services/employeeService.service';
import { EmployeeModel } from '../../models/employeeModel';
import { ITimeslot } from '../../models/timeSlot';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-selected',
  standalone: true,
  imports: [NgIf],
  templateUrl: './employee-selected.component.html',
  styleUrl: './employee-selected.component.css'
})
export class EmployeeSelectedComponent implements OnInit {
  employeeSelected: string | null = '';
  slotBooked: string | null = '';
  employeeDetails: EmployeeModel = {
    name: '',
    phone: '',
    email: '',
    role: '',
    status: '',
    yearsOfExperience: '',
    is_verified: false,
    _id: ''
  };

  timeSlotDetails: ITimeslot = {
    employeeId: '',
    date: '',
    startTime: '',
    endTime: ''
  }

  constructor(private userService: userService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.userService.getEmployeeId().subscribe((id) => {
      this.employeeSelected = id;
    })

    this.userService.getTimeslotSelected().subscribe((slotId) => {
      this.slotBooked = slotId;
    })

    this.loadEmployeeDetails();
    this.loadTimeSlot();
  }

  loadEmployeeDetails(): void {
    if (this.employeeSelected) {
      this.employeeService.getEmployeeDetails(this.employeeSelected).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.employeeDetails = response.data;
            console.log(this.employeeDetails);
          } else {
            console.error('Error: No employee details found');
          }
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
    } else {
      console.error('Error: No employee ID provided');
    }
  }

  loadTimeSlot(): void {
    if (this.slotBooked) {
      this.userService.getTimeSlotDetails(this.slotBooked).subscribe(
        (response: any) => {
          console.log(response);
          if (response.success) {
            this.timeSlotDetails = response.data;
          } else {
            console.error('Error: No timeslot details found');
          }
        },
        (error) => {
          console.error('Error fetching timeslot details:', error);
        }
      );
    } else {
      console.error('Error: No slot ID provided');
    }
  }

  clearSelection() {
    this.userService.setEmployeeId(null);
    this.userService.setTimeSlot(null);
  }

}

