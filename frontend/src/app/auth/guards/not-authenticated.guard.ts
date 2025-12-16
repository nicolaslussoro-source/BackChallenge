import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth-service';

export const NotAuthenticatedGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = (!!authService.user());

    if (isAuthenticated) {
        return router.parseUrl('/auth/dashboard');
    } else {
       return true;
    }
    
    
};