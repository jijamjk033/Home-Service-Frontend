import { Routes } from '@angular/router';
import { UserRegistrationComponent } from '../../User/components/user-registration/user-registration.component';
import { LoginComponent } from '../components/login/login.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { OtpVerificationComponent } from '../components/otp-verification/otp-verification.component';
import { CommonAuthbackgroundComponent } from '../components/common-authbackground/common-authbackground.component';
import { EmployeeRegistrationComponent } from '../../employee/components/employee-registration/employee-registration.component';
import { UserLoginComponent } from '../../User/components/user-login/user-login.component';
import { AdminLoginComponent } from '../../Admin/components/admin-login/admin-login.component';
import { TableComponent } from '../components/table/table.component';
import { EmployeeLoginComponent } from '../../employee/components/employee-login/employee-login.component';
import { UserOtpComponent } from '../../User/components/user-otp/user-otp.component';
import { EmployeeOtpComponent } from '../../employee/components/employee-otp/employee-otp.component';


export const commonRoutes: Routes = [
      {
            path: 'form', component: CommonAuthbackgroundComponent,
            children: [
                  { path: 'login', component: LoginComponent },
                  { path: 'signup', component: UserRegistrationComponent },
                  { path: 'user-otp', component: UserOtpComponent },
                  { path: 'employee-otp', component: EmployeeOtpComponent },
                  { path: 'change-password', component: ChangePasswordComponent },
                  { path: 'employee-registration', component: EmployeeRegistrationComponent },
                  { path: 'userLogin', component: UserLoginComponent },
                  { path: 'adminLogin', component: AdminLoginComponent },
                  { path: 'employeeLogin', component: EmployeeLoginComponent },

            ]
      },
      { path: 'table', component: TableComponent },

];

