import { Component } from '@angular/core';
import { LoginComponent } from '../../../common/components/login/login.component';
import { userService } from '../../services/userService';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  constructor(private router: Router, private toastr: ToastrService, private userService: userService) { }

  userLogin(credentials: { email: string; password: string }) {
    this.userService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('user_id', response.data.user.id);
        this.toastr.success(response.data.message, 'Success');
        this.router.navigate(['/userHome']);
      },
      error: (error) => {
        this.toastr.error(error.error.error, 'Error');
      }
    });
  }
}
