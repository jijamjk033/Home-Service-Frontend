import { Component, OnInit } from '@angular/core';
import { OtpVerificationComponent } from '../../../common/components/otp-verification/otp-verification.component';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employeeService.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-otp',
  standalone: true,
  imports: [OtpVerificationComponent],
  templateUrl: './employee-otp.component.html',
  styleUrl: './employee-otp.component.css'
})
export class EmployeeOtpComponent implements OnInit {
  otpToken: string | null = null;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
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

    this.employeeService.verifyOtp(otp, this.otpToken).subscribe({
      next: (response) => {
        this.toastr.success('OTP verified successfully', 'Success');
        this.router.navigate(['/form/employeeLogin']);
      },
      error: (error) => {
        this.toastr.error('OTP verification failed', 'Error');
      }
    });
  }
}
