import { Component, OnInit } from '@angular/core';
import { BookingDetails } from '../../models/bookingInterface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CommonModule, NgIf } from '@angular/common';
import { ChatService } from '../../../common/services/chat.service';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {
  booking: BookingDetails = {} as BookingDetails;

  constructor(private route: ActivatedRoute, private router: Router, private chatService: ChatService,
    private bookingService: BookingService) { }

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.bookingService.getBookingDetails(bookingId).subscribe({
        next: (response) => {
          this.booking = response.data;
          console.log(this.booking);

        },
        error: (err) => {
          console.error('Failed to fetch booking details:', err);
        },
      });
    }
  }

  showCancelModal: boolean = false;
  bookingIdToCancel: string = '';

  onCancelBooking(bookingId: string): void {
    this.bookingIdToCancel = bookingId;
    this.showCancelModal = true;
  }

  confirmCancelBooking(): void {
    console.log(this.bookingIdToCancel);
    this.bookingService.cancelBooking(this.bookingIdToCancel, this.booking.employee, 'User').subscribe({
      next: (response) => {
        if (response) {
          this.showCancelModal = false;
          alert('Booking cancelled successfully.');
          this.router.navigate(['/book/booking-list']);
        }
      },
      error: (err) => {
        console.error('Failed to cancel booking:', err);
        this.showCancelModal = false;
        alert('An error occurred while cancelling the booking.');
      },
    });
  }

  closeCancelModal(): void {
    this.showCancelModal = false;
  }

  onChat(userId: string, employeeId: string) {
    this.chatService.initiateChat(userId, employeeId).subscribe(
      (response) => {
        const chatId = response.data.chatId;
        this.router.navigate(['/chat', chatId]);
      },
      (error) => {
        console.error('Failed to initiate chat:', error);
      }
    );
  }
}
