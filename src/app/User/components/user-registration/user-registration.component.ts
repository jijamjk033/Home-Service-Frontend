import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { userService } from '../../services/userService';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})

export class UserRegistrationComponent implements OnInit {

  userForm!: FormGroup;
  errorMessage: string = ''
  isRegisterLoading: boolean = false;

  constructor(
    private userService: userService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  signupUser() {
    if (this.userForm.invalid) {
      return;
    }
    this.isRegisterLoading = true;
    const userData = {
      ...this.userForm.value,
      role: 'User'
    };
    this.userService.signup(userData).subscribe({
      next: (response) => {
        this.toastr.success('Registration successful', 'Success');
        this.router.navigate(['/user-otp']);
        localStorage.setItem('otpToken', response.data.otpToken);
        localStorage.setItem('userEmail', this.userForm.value.email);
        this.isRegisterLoading = false;

      },
      error: (error) => {
        this.isRegisterLoading = false;
        if (error.error && error.error.message === 'This user already exists') {
          this.errorMessage = error.error.message;
          alert('This user already exists');
        } else {
          this.toastr.error('Registration failed', 'Error');
        }
      }
    });
  }
}
