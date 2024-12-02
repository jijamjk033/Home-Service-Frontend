import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../employee/services/employeeService.service';
import { EmployeeModel } from '../../models/employeeModel';
import { NgFor, NgIf } from '@angular/common';
import { timeSlotsResponse } from '../../../employee/interface/employeeInterface';
import { userService } from '../../services/userService';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setTimeSlotId } from '../../../state/booking/booking.actions';
import { BookingState } from '../../../state/booking/booking.state';

@Component({
  selector: 'app-timeslot-selection',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule,RouterModule],
  templateUrl: './timeslot-selection.component.html',
  styleUrl: './timeslot-selection.component.css'
})

export class TimeslotSelectionComponent implements OnInit {
  employeeId: string = '';
  timeSlots: timeSlotsResponse[] = [];
  employeeDetails: EmployeeModel = {
    name: '',
    phone: '',
    email: '',
    role: '',
    status: '',
    yearsOfExperience: 0,
    is_verified: false,
    _id: '',
    rating: 0
  };
  selectedDate: string = '';
  availableDates: { date: string; label: string }[] = [];
  slotSelected:string = '';

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService,private store:Store<BookingState> ,private userService: userService, private router: Router) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.generateAvailableDates();
    this.loadEmployeeDetails();
  }

  generateAvailableDates(): void {
    const today = new Date();
    for (let i = 1; i <= 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const dayOfMonth = date.getDate();
      const dateString = date.toISOString().split('T')[0];
      this.availableDates.push({
        date: dateString,
        label: `${dayName} - ${dayOfMonth} ${monthName}`
      });
    }
    this.selectedDate = this.availableDates[0].date;
    this.loadAvailableTimeSlots();
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

  formatTimeSlot(slot: timeSlotsResponse): string {

    const startTime = this.formatTime(slot.startTime);
    const endTime = this.formatTime(slot.endTime);

    return `${startTime} - ${endTime}`;
  }

  private formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${('0' + formattedHours).slice(-2)}:${('0' + minutes).slice(-2)} ${period}`;
  }

  onDateChange(): void {
    if (this.selectedDate) {
      this.loadAvailableTimeSlots();
    }
  }

  loadAvailableTimeSlots(): void {
    this.userService.fetchTimeSlots(this.employeeId, this.selectedDate).subscribe(
      (response: any) => {
        if (response.success) {
          this.timeSlots = response.data.filter((slot: timeSlotsResponse) => !slot.isBooked);
        } else {
          console.error('Error: No time slots found for this date');
          this.timeSlots = [];
        }
      },
      (error) => {
        console.error('Error fetching time slots:', error);
        this.timeSlots = [];
      }
    );
  }

  timeslotSelected(slotId:string){
    this.slotSelected = slotId;
    this.store.dispatch(setTimeSlotId({timeSlotId: slotId}));
  }

}
