import { CanActivateFn, Router } from '@angular/router';
import { userService } from '../services/userService';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const backendService = inject(userService);
  const router = inject(Router);

  if (backendService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/form/userLogin']);
    return false;
  }
};
