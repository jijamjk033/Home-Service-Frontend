import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingDetails } from '../../../User/models/bookingInterface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../../../User/services/booking.service';
import { ChatService } from '../../../common/services/chat.service';
import { NotificationService } from '../../../common/services/notification.service';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  booking!: BookingDetails;
  showCancelModal: boolean = false;

  constructor(private route: ActivatedRoute,private chatService: ChatService,
    private notificationService: NotificationService,
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
    this.showCancelModal = true; 
  }
  closeCancelModal(): void {
    this.showCancelModal = false;
  }
  confirmCancelBooking(): void {
    this.showCancelModal = false;
    this.bookingService.cancelBooking(this.booking._id, this.booking.userId, 'Employee').subscribe({
      next: (response) => {
        console.log('Booking cancelled:', response);
        const notificationData = {
          senderId: this.booking.employeeId,
          senderModel: 'Employee',
          recipientId: this.booking.userId,
          recipientModel: 'User',
          orderId: this.booking._id,
          type: 'cancellation',
          message: `Your booking has been canceled by Service Provider, ${this.booking.employee}.`,
        };
        this.notificationService.sendNotification('notification', notificationData); 
        this.router.navigate(['/employeeHome/bookingList']);
      },
      error: (err) => {
        console.error('Failed to cancel booking:', err);
      },
    });
  }
  

  onChat(userId:string, employeeId:string){
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
