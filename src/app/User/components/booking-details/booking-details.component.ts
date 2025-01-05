import { Component, OnInit } from '@angular/core';
import { BookingDetails } from '../../models/bookingInterface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CommonModule, NgIf } from '@angular/common';
import { ChatService } from '../../../common/services/chat.service';
import { NotificationService } from '../../../common/services/notification.service';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {
  booking: BookingDetails = {} as BookingDetails;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private bookingService: BookingService,
    private notificationService: NotificationService,
  ) { }

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
          const notificationData = {
            senderId: this.booking.userId,
            senderModel: 'User',
            recipientId: this.booking.employee,
            recipientModel: 'Employee',
            orderId: this.booking._id,
            type: 'cancellation',
            message: 'Your booking has been canceled by the employee.',
          };
          this.notificationService.sendNotification('notification', notificationData);
          this.router.navigate(['/book/booking-list']);
        }
      },
      error: (err) => {
        console.error('Failed to cancel booking:', err);
        this.showCancelModal = false;
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
