import { Component, OnInit } from '@angular/core';
import { OtpVerificationComponent } from '../../../common/components/otp-verification/otp-verification.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userService } from '../../services/userService';

@Component({
  selector: 'app-user-otp',
  standalone: true,
  imports: [OtpVerificationComponent],
  templateUrl: './user-otp.component.html',
  styleUrl: './user-otp.component.css'
})
export class UserOtpComponent implements OnInit {
  otpToken: string | null = null;

  constructor(
    private router: Router,
    private userService: userService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.otpToken = localStorage.getItem('otpToken');
    }
  }

  onOtpSubmitted(otp: string): void {
    if (!this.otpToken) {
      this.toastr.error('OTP token is missing', 'Error');
      return;
    }
    this.userService.verifyOtp(otp, this.otpToken).subscribe({
      next: (response) => {
        this.toastr.success('OTP verified successfully', 'Success');
        this.router.navigate(['/form/userLogin']);
      },
      error: (error) => {
        this.toastr.error('OTP verification failed', 'Error');
      }
    });
  }
}