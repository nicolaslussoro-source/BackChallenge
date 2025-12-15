import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes')

    },
    {
        path: 'metrics',
        loadChildren: () => import('./metrics/metrics.routes')
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
