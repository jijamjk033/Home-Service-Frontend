import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingDetails } from '../../../User/models/bookingInterface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../../../User/services/booking.service';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  booking!: BookingDetails;

  constructor(private route: ActivatedRoute,
    private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.bookingService.getBookingDetails(bookingId).subscribe({
        next: (response) => {
          this.booking = response.data;
          console.log(this.booking)
        },
        error: (err) => {
          console.error('Failed to fetch booking details:', err);
        },
      });
    }
  }

  acceptBooking(): void {
    this.bookingService.updateBookingStatus(this.booking._id, { bookingStatus: 'Confirmed' }).subscribe({
      next: (response) => {
        console.log('Booking accepted:', response);
        this.router.navigate(['/employeeHome/bookingList']);
      },
      error: (err) => {
        console.error('Failed to update booking status:', err);
      }
    });
  }

  completeBooking(): void {
    this.bookingService.updateBookingStatus(this.booking._id, { completed: true }).subscribe({
      next: (response) => {
        console.log('Booking completed:', response);
        this.router.navigate(['/employeeHome/bookingList']);
      },
      error: (err) => {
        console.error('Failed to mark booking as completed:', err);
      }
    });
  }

  cancelBooking(): void {
    this.bookingService.updateBookingStatus(this.booking._id, { bookingStatus: 'Cancelled' }).subscribe({
      next: (response) => {
        console.log('Booking cancelled:', response);
        this.router.navigate(['/employeeHome/bookingList']);
      },
      error: (err) => {
        console.error('Failed to cancel booking:', err);
      }
    });
  }

}
