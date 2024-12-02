import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingListData } from '../../../User/models/bookingInterface';
import { BookingService } from '../../../User/services/booking.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  displayedBookings: Array<BookingListData> = [];

  constructor(private bookingService: BookingService) { }
  ngOnInit(): void {
    const employeeId = localStorage.getItem('employee_id');
    if (employeeId) {
      this.bookingService.getEmployeeBookings(employeeId).subscribe(
        (response) => {
          const bookings = Array.isArray(response.data) ? response.data : [];
          console.log(response);
          this.displayedBookings = bookings
            .filter((booking) => !booking.completed)
            .map((booking) => ({
              _id: booking._id || '',
              user: booking.userName || '',
              date: booking.date || '',
              service: booking.service || '',
              category: booking.category || '',
              address: booking.address || '',
              totalAmount: booking.totalAmount || 0,
              paymentMethod: booking.paymentMethod || '',
              bookingStatus: booking.bookingStatus || '',
              completed: booking.completed,
            }));
        },
        (error) => {
          console.error('Error fetching bookings:', error);
          this.displayedBookings = [];
        }
      );
    }
  }

}
