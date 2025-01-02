import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../common/components/table/table.component';
import { BookingListData } from '../../models/bookingInterface';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [TableComponent, NgIf],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css'
})
export class BookingHistoryComponent implements OnInit {
  tableHeaders = ['Service Provider', 'Date', 'Work', 'Service', 'Amount', 'Payment', 'Status'];
  headerKeys = ['employee', 'date', 'category', 'service', 'totalAmount', 'paymentMethod', 'bookingStatus'];

  displayedBookings: Array<BookingListData> = [];

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    let userId: string | null = null;

    if (typeof window !== 'undefined') {
      userId = localStorage.getItem('user_id');
    }
    if (userId) {
      this.bookingService.getUserBookings(userId).subscribe(
        (response) => {
          const bookings = Array.isArray(response.data) ? response.data : [];
          this.displayedBookings = bookings.filter((booking) => booking.completed || booking.bookingStatus == 'Cancelled')
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
            })).sort((a, b) => {
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
