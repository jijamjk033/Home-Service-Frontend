import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../common/components/table/table.component';
import { BookingService } from '../../services/booking.service';
import { BookingListData } from '../../models/bookingInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.css'
})
export class BookingsListComponent implements OnInit {
  tableHeaders = ['Service Provider', 'Date', 'Work', 'Service', 'Amount', 'Payment', 'Status'];
  headerKeys = ['employee', 'date', 'category', 'service', 'totalAmount', 'paymentMethod', 'bookingStatus'];

  displayedBookings: Array<BookingListData> = [];

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.bookingService.getUserBookings(userId).subscribe(
        (response) => {
          const bookings = Array.isArray(response.data) ? response.data : [];
          this.displayedBookings = bookings
            .filter((booking) => !booking.completed && booking.bookingStatus !== 'Cancelled')
            .map((booking) => ({
              _id: booking._id || '',
              employee: booking.employee || '',
              date: booking.date || '',
              service: booking.service || '',
              category: booking.category || '',
              totalAmount: booking.totalAmount || 0,
              paymentMethod: booking.paymentMethod || '',
              bookingStatus: booking.bookingStatus || '',
              completed: booking.completed,
            }))
            .sort((a, b) => {
              const parseDate = (dateStr: string): Date => {
                const [day, timeRange] = dateStr.split(', ').slice(1);
                const [startTime] = timeRange.split(' - '); 
                const fullDate = `${day} ${startTime}`; 
                return new Date(fullDate);
              };
              return parseDate(b.date).getTime() - parseDate(a.date).getTime();
            });
        },
        (error) => {
          console.error('Error fetching bookings:', error);
          this.displayedBookings = [];
        }
      );
    }
  }


  onBookingClick(bookingId: string) {
    this.router.navigate(['/book/booking-details', bookingId]);
  }

}