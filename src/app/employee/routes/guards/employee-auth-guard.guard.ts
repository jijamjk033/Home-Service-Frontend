import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { EmployeeService } from '../../services/employeeService.service';


export const employeeAuthGuard: CanActivateFn = (route, state) => {
  const backendService = inject(EmployeeService);
  const router = inject(Router);
  if (backendService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/employeeLogin']);
    return false;
  }
};

