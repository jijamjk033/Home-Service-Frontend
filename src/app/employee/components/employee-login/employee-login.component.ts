import { Component } from '@angular/core';
import { LoginComponent } from '../../../common/components/login/login.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employeeService.service';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css'
})
export class EmployeeLoginComponent {

  constructor(private router: Router, private toastr: ToastrService, private employeeService: EmployeeService){}
  
  employeeLogin(credentials: { email: string; password: string }) {
    this.employeeService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('employeeToken', response.data.token);
        localStorage.setItem('employee_id', response.data.employee.id);
        this.toastr.success(response.data.message, 'Success');
        this.router.navigate(['/employeeHome/dashboard']);
      },
      error: (error) => {
        this.toastr.error(error.error.error, 'Error');
      }
    });
  }
}
