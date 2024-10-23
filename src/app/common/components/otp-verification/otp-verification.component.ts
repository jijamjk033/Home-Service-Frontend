import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent implements OnInit {

  @Input() userType: 'user' | 'employee' = 'user';
  @Output() otpSubmitted: EventEmitter<string> = new EventEmitter<string>();

  otpForm!: FormGroup;
  countdown: number = 40;
  otpToken: string | null = null;
  resendDisabled: boolean = true;
  errorMessage: string | null = null; 
  isLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern(/^[0-9]{1}$/)]],
      otp2: ['', [Validators.required, Validators.pattern(/^[0-9]{1}$/)]],
      otp3: ['', [Validators.required, Validators.pattern(/^[0-9]{1}$/)]],
      otp4: ['', [Validators.required, Validators.pattern(/^[0-9]{1}$/)]]
    });

    this.startCountdown();
  }

  moveToNext(event: any, nextControl: string): void {
    if (event.target.value && nextControl) {
      const nextInput = document.getElementById(nextControl);
      nextInput?.focus();
    }
  }

  verifyOtp(): void {
    if (this.otpForm.invalid) {
      this.toastr.error('Please enter a valid OTP', 'Error');
      return;
    }
    const otp = this.otpForm.value.otp1 + this.otpForm.value.otp2 + this.otpForm.value.otp3 + this.otpForm.value.otp4;
    this.otpSubmitted.emit(otp);
  }

  startCountdown(): void {
    this.resendDisabled = true;
    this.countdown = 40;
    const timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.resendDisabled = false;
        clearInterval(timer);
      }
    }, 1000);
  }

  resendOtp(): void {
    if (this.userType === 'employee') {
    } else if (this.userType === 'user') {
    } else {
      this.toastr.error('User type is missing', 'Error');
    }
  }
  
}
