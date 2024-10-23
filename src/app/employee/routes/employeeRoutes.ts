import { Routes } from "@angular/router";
import { EmployeeHomeComponent } from "../components/employee-home/employee-home.component";
import { employeeAuthGuard } from "./guards/employee-auth-guard.guard";
import { TimeslotsComponent } from "../components/timeslots/timeslots.component";

export const employeeRoutes: Routes = [
    {
        path: 'employeeHome', component: EmployeeHomeComponent,
        children: [
            {path: 'employeeTimeSlot', component: TimeslotsComponent,canActivate:[employeeAuthGuard],},
        ]
    },

]