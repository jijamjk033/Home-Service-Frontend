import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employeeService.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-registration',
  standalone: true,
  imports: [FormsModule,RouterModule,NgIf,ReactiveFormsModule],
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.css'
})
export class EmployeeRegistrationComponent implements OnInit {
  employeeForm!: FormGroup;
  isRegisterLoading: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      role: [null, Validators.required],
      yearsOfExperience: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
    }, { validators: this.passwordMatchValidator });
  }
  

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  signupEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }
    this.isRegisterLoading = true;  
    this.employeeService.signup(this.employeeForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Registration successful', 'Success');
        this.router.navigate(['/form/employee-otp']);
        localStorage.setItem('otpToken', response.data.otpToken);
        localStorage.setItem('employeeEmail', this.employeeForm.value.email);
        this.isRegisterLoading = false;
      },
      error: (error) => {
        this.isRegisterLoading = false;
        if (error.error && error.error.message === 'This employee already exists') {
          alert('This employee already exists');
        } else {
          this.toastr.error('Registration failed', 'Error');
        }
      }
    });
  }

}
