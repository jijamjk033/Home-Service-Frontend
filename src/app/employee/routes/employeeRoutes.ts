import { Routes } from "@angular/router";
import { EmployeeHomeComponent } from "../components/employee-home/employee-home.component";
import { employeeAuthGuard } from "./guards/employee-auth-guard.guard";
import { TimeslotsComponent } from "../components/timeslots/timeslots.component";
import { BookingListEmployeeComponent } from "../components/booking-list-employee/booking-list-employee.component";
import { BookingDetailsComponent } from "../components/booking-details/booking-details.component";
import { BookingCompletedComponent } from "../components/booking-completed/booking-completed.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { EmployeeProfileComponent } from "../components/employee-profile/employee-profile.component";

export const employeeRoutes: Routes = [
    {
        path: 'employeeHome', component: EmployeeHomeComponent,
        children: [
            {path: 'dashboard', component:DashboardComponent, canActivate: [employeeAuthGuard]},
            {path: 'employeeTimeSlot', component: TimeslotsComponent,canActivate:[employeeAuthGuard],},
            {path: 'bookingList', component:BookingListEmployeeComponent, canActivate: [ employeeAuthGuard]},
            {path: 'bookingDetails/:id', component: BookingDetailsComponent, canActivate: [employeeAuthGuard]},
            {path: 'bookingHistory', component:BookingCompletedComponent, canActivate: [ employeeAuthGuard]},
            {path: 'employeeprofile', component:EmployeeProfileComponent, canActivate:[ employeeAuthGuard]}
        ]
    },

]