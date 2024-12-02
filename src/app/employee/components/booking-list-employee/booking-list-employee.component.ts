import { Component } from '@angular/core';
import { TableComponent } from '../../../common/components/table/table.component';
import { BookingListData } from '../../../User/models/bookingInterface';
import { BookingService } from '../../../User/services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list-employee',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './booking-list-employee.component.html',
  styleUrl: './booking-list-employee.component.css'
})
export class BookingListEmployeeComponent {
  tableHeaders = ['User', 'Date', 'Work', 'Service', 'Amount', 'Payment', 'Status'];
  headerKeys = ['user', 'date', 'category', 'service', 'totalAmount', 'paymentMethod', 'bookingStatus'];

  displayedBookings: Array<BookingListData> = [];

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    const employeeId = localStorage.getItem('employee_id');
    if (employeeId) {
      this.bookingService.getEmployeeBookings(employeeId).subscribe(
        (response) => {
          const bookings = Array.isArray(response.data) ? response.data : [];
          console.log(response);
          
          this.displayedBookings = bookings.filter((booking) => !booking.completed)
          .map((booking) => ({
            _id: booking._id || '',
            user: booking.userName || '',
            date: booking.date || '',
            service: booking.service || '',
            category: booking.category || '',
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

  onBookingClick(bookingId: string) {
    this.router.navigate(['/employeeHome/bookingDetails', bookingId]);
  }

}
