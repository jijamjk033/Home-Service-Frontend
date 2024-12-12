import { Component, OnInit } from '@angular/core';
import { BookingDetails } from '../../models/bookingInterface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CommonModule, NgIf } from '@angular/common';
import { ChatService } from '../../../common/services/chat.service';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, NgIf,RouterModule],
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

  onCancelBooking(bookingId: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(bookingId).subscribe({
        next: (response) => {
          if(response){
            alert('Booking cancelled successfully.');
            this.router.navigate(['/book/booking-list']);
          }
        },
        error: (err) => {
          console.error('Failed to cancel booking:', err);
          alert('An error occurred while cancelling the booking.');
        },
      });
    }
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
