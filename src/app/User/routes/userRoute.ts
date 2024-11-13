import { Routes } from '@angular/router';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { CategoryComponent } from '../components/category/category.component';
import { ServicesProvidedComponent } from '../components/services-provided/services-provided.component';
import { ServiceBookingComponent } from '../components/service-booking/service-booking.component';
import { ServiceSelectionComponent } from '../components/service-selection/service-selection.component';
import { TimeslotSelectionComponent } from '../components/timeslot-selection/timeslot-selection.component';
import { userAuthGuard } from '../guards/user-auth.guard';
import { EmployeeSelectedComponent } from '../components/employee-selected/employee-selected.component';
import { CheckoutPageComponent } from '../components/checkout-page/checkout-page.component';

export const userRoutes: Routes = [

    { path: '', redirectTo: 'userHome', pathMatch: 'full' },

    { path: 'userHome', component: HomepageComponent },
    {
        path: 'book', component: ServiceBookingComponent, children: [
            { path: 'categories', component: CategoryComponent },
            { path: 'services/:id', component: ServicesProvidedComponent },
            { path: 'service-selection/:id', component: ServiceSelectionComponent},
            { path: 'timeslots/:id', component: TimeslotSelectionComponent, canActivate: [userAuthGuard]},
            { path: 'checkout/:id', component:CheckoutPageComponent, canActivate:[userAuthGuard]}
        ]
    },


];
