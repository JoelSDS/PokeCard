import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const rangeIdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const id = route.params['id'];

  if (id >= 1 && id <= 151) {
    return true;
  }
  return router.navigate(['/notFound']);
};
