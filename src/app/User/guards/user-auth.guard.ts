import { CanActivateFn, Router } from '@angular/router';
import { userService } from '../services/userService';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = async (route, state) => {
  const backendService = inject(userService);
  const router = inject(Router);
  const isLoggedIn = await backendService.isLoggedIn();
  if (isLoggedIn) {
    return true;
  } else {
    backendService.setRedirectUrl(state.url);
    router.navigate(['/userLogin']);
    return false;
  }
};  