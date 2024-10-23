import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() userType: 'user' | 'admin' | 'employee' = 'user';
  @Output() loginCredentials = new EventEmitter<{ email: string; password: string }>();

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [ Validators.required,Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  getRegistrationLink(): string[] {
    if (this.userType === 'user') {
      return ['/form/signup'];
    } else if (this.userType === 'employee') {
      return ['/form/employee-registration'];
    } else {
      return [];
    }
  }


  login() {
  if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginCredentials.emit({ email, password });
    } else {
      this.toastr.error('Please enter a valid email and password', 'Error');
    }
  }

}
