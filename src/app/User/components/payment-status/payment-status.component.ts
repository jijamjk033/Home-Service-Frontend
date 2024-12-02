import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDetails } from '../../models/bookingInterface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css'
})
export class PaymentStatusComponent implements OnInit {
  paymentDetails!: PaymentDetails;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.paymentDetails = history.state as PaymentDetails;
  }
  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
