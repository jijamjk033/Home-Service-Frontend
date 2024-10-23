import { CanActivateFn, Router } from '@angular/router';
import { userService } from '../services/userService';
import { inject } from '@angular/core';

export const userFalseAuthGuard: CanActivateFn = (route, state) => {
  const backendService = inject(userService);
  const router = inject(Router)
  if (backendService.isLoggedIn()) {
    router.navigate(['/userHome']);
    return false;
  } else {
    return true
  }
};
