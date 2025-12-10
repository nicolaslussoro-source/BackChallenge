import { Routes } from '@angular/router';
import MetricsLayout from './layouts/metrics-layout/metrics-layout';

export const metricsRoutes: Routes = [
    { 
        path: '',
        component: MetricsLayout,
        children: [
            {
                path: 'user',
                loadComponent: () => import('./pages/metrics-user-page/metrics-user-page')
            },
            {
                path: 'admin',
                loadComponent: () => import('./pages/metrics-admin-page/metrics-admin-page')
            },
            {
                path: '',
                redirectTo: 'user',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'user'
            },
        ]
    }
];

export default metricsRoutes;