import { Component } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-metrics-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './metrics-layout.html',
})
export class MetricsLayout { 
  items = [
    { label: 'User Metrics', route: '/metrics/user', icon: 'user',  },
    { label: 'Admin Metrics', route: '/metrics/admin', icon: 'admin' },
  ];
}

export default MetricsLayout;
