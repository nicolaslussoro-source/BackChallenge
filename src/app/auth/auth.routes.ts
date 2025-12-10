import { Routes } from "@angular/router";
import AuthLayout from "./layouts/auth-layout/auth-layout";

export const authRoutes: Routes = [
    { 
        path: '',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/auth-login-page/auth-login-page')
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/auth-register-page/auth-register-page')
            },
            {
                path: 'me',
                loadComponent: () => import('./pages/auth-me-page/auth-me-page')
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]


     }
];

export default authRoutes;