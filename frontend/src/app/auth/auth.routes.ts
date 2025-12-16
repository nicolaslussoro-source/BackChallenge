import { Routes } from "@angular/router";
import AuthLayout from "./layouts/auth-layout/auth-layout";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";
import { AuthenticatedGuard } from "./guards/authenticated.guard";

export const authRoutes: Routes = [
    { 
        path: '',
        component: AuthLayout,
        children: [
             {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/auth-me-page/auth-me-page'),
                canActivate: [ AuthenticatedGuard ]
            },
            
            {
                path: 'login',
                loadComponent: () => import('./pages/auth-login-page/auth-login-page'),
                canActivate: [ NotAuthenticatedGuard ] 
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/auth-register-page/auth-register-page'),
                canActivate: [ NotAuthenticatedGuard ]
            },
            
            
           
        ],
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

export default authRoutes