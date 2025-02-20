import { Component } from '@angular/core';
import { LoginComponent } from '../../../common/components/login/login.component';
import { AdminServices } from '../../services/adminService';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  constructor(private adminService: AdminServices, private toastr:ToastrService, private router: Router){}

  adminLogin(credentials: { email: string; password: string }) {
    this.adminService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', response.data.admin);
        localStorage.setItem('userRole', 'admin');
        this.toastr.success(response.data.message, 'Success');
        this.router.navigate(['/adminHome/adminDashboard']);
      },
      error: (error) => {
        this.toastr.error(error.error.error, 'Error');
      }
    });
  }
}
