import { Component, OnInit } from '@angular/core';
import { BookingDetails } from '../../models/bookingInterface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CommonModule, NgIf } from '@angular/common';
import { ChatService } from '../../../common/services/chat.service';
import { NotificationService } from '../../../common/services/notification.service';
import { ChatComponent } from '../../../common/components/chat/chat.component';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule,ChatComponent],
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
            recipientId: this.booking.employeeId,
            recipientModel: 'Employee',
            orderId: this.booking._id,
            type: 'cancellation',
            message: `A booking has been canceled by User ${this.booking.userName} .`,
          };
          console.log(notificationData);
          
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

  chatVisible: boolean = false;
  chatId: string = '';

  onChat(userId: string, employeeId: string) {
    this.chatService.initiateChat(userId, employeeId).subscribe(
      (response) => {
        this.chatId = response.data.chatId;
        this.chatVisible = true;
      },
      (error) => {
        console.error('Failed to initiate chat:', error);
      }
    );
  }

  closeChat(): void {
    this.chatVisible = false;
    this.chatId = '';
  }
}
