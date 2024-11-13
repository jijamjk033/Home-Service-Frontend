import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { commonRoutes } from './common/routes/commonRoute';
import { userRoutes } from './User/routes/userRoute';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adminRoutes } from './Admin/routes/adminRoute';
import { employeeRoutes } from './employee/routes/employeeRoutes';
import { ErrorInterceptorFn} from './interceptor/error-interceptor.service';
import { provideStore } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { bookingReducer } from './state/booking/booking.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(commonRoutes),
    provideRouter(userRoutes),
    provideRouter(adminRoutes),
    provideRouter(employeeRoutes),
    importProvidersFrom(
      HttpClientModule, 
      ToastrModule.forRoot(), 
      BrowserAnimationsModule,
    ),
    provideToastr({
        closeButton: true,
        tapToDismiss: true,
        newestOnTop: true,
        easing: 'ease-in',
        toastClass: 'ngx-toastr',
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true,
        timeOut: 3000,
        progressAnimation: 'decreasing'
    }), provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideHttpClient(withInterceptors([ErrorInterceptorFn])), provideAnimationsAsync(),
    provideStore({ booking: bookingReducer })
]
};
