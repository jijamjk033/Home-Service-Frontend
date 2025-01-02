import { Routes } from '@angular/router';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { CategoryComponent } from '../components/category/category.component';
import { ServicesProvidedComponent } from '../components/services-provided/services-provided.component';
import { ServiceBookingComponent } from '../components/service-booking/service-booking.component';
import { ServiceSelectionComponent } from '../components/service-selection/service-selection.component';
import { TimeslotSelectionComponent } from '../components/timeslot-selection/timeslot-selection.component';
import { userAuthGuard } from '../guards/user-auth.guard';
import { CheckoutPageComponent } from '../components/checkout-page/checkout-page.component';
import { PaymentStatusComponent } from '../components/payment-status/payment-status.component';
import { BookingsListComponent } from '../components/bookings-list/bookings-list.component';
import { BookingDetailsComponent } from '../components/booking-details/booking-details.component';
import { BookingHistoryComponent } from '../components/booking-history/booking-history.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { WalletComponent } from '../components/wallet/wallet.component';

export const userRoutes: Routes = [

    { path: '', redirectTo: 'userHome', pathMatch: 'full' },

    { path: 'userHome', component: HomepageComponent },
    { path: 'userProfile', component: UserProfileComponent, canActivate: [userAuthGuard]},
    { path: 'wallet', component: WalletComponent, canActivate:[userAuthGuard]},
    { path: 'book', component: ServiceBookingComponent, children: [
            { path: 'categories', component: CategoryComponent },
            { path: 'services/:id', component: ServicesProvidedComponent },
            { path: 'service-selection/:id', component: ServiceSelectionComponent},
            { path: 'timeslots/:id', component: TimeslotSelectionComponent, canActivate: [userAuthGuard]},
            { path: 'checkout/:id', component:CheckoutPageComponent, canActivate:[userAuthGuard]},
            { path: 'payment-status', component:PaymentStatusComponent, canActivate:[userAuthGuard]},
            { path: 'booking-list', component:BookingsListComponent, canActivate: [userAuthGuard]},
            { path: 'booking-details/:id', component: BookingDetailsComponent, canActivate: [userAuthGuard]},
            { path: 'booking-history', component: BookingHistoryComponent, canActivate: [userAuthGuard]},
        ]
    },
];
