import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../employee/services/employeeService.service';
import { RelatedServicesComponent } from '../booking-process/related-services/related-services.component';
import { EmployeeModel } from '../../models/employeeModel';
import { AdminServices } from '../../../Admin/services/adminService';
import { NgFor, NgIf } from '@angular/common';
import { timeSlotsResponse } from '../../../employee/interface/employeeInterface';

@Component({
  selector: 'app-timeslot-selection',
  standalone: true,
  imports: [RelatedServicesComponent, NgFor, NgIf],
  templateUrl: './timeslot-selection.component.html',
  styleUrl: './timeslot-selection.component.css'
})
export class TimeslotSelectionComponent implements OnInit {
  employeeId: string = '';
  timeSlots: any[] = [];
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

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.loadEmployeeDetails();
    this.loadExistingTimeSlots();
  }

  loadEmployeeDetails(): void {
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.employeeDetails = response.data;
        } else {
          console.error('Error: No employee details found');
        }
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }


  loadExistingTimeSlots(): void {
    this.employeeService.getTimeSlots(this.employeeId).subscribe(
      (response: any) => {
        if (response.success) {
          this.timeSlots = response.data;
        } else {
          console.error('Error: No time slots found');
        }
      },
      (error) => {
        console.error('Error fetching time slots:', error);
      }
    );
  }


  bookTimeSlot(slotId: string): void {
    this.employeeService.bookTimeSlot(this.employeeId, slotId).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Time slot booked successfully');
          this.loadExistingTimeSlots();
        } else {
          console.error('Error booking time slot:', response.message);
        }
      },
      (error) => {
        console.error('Error booking time slot:', error);
      }
    );
  }
  
  formatTimeSlot(slot: timeSlotsResponse): string {
    const date = new Date(slot.date);
    const formattedDate =
      ('0' + date.getDate()).slice(-2) + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      date.getFullYear();

    const startTime = this.formatTime(slot.startTime);
    const endTime = this.formatTime(slot.endTime);

    return `${formattedDate},  ${startTime} - ${endTime}`;
  }

  private formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${('0' + formattedHours).slice(-2)}:${('0' + minutes).slice(-2)} ${period}`;
  }

}
