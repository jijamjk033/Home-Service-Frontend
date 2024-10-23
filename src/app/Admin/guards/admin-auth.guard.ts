import { CanActivateFn, Router } from '@angular/router';
import { AdminServices } from '../services/adminService';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const backendService = inject(AdminServices);
  const router = inject(Router); 
  if (backendService.isLoggedIn()) {
    return true; 
  } else {    
    router.navigate(['/form/adminLogin']);
    return false;
  }
};
