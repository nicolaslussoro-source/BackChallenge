import { DatePipe } from '@angular/common';
import { User } from './../../../shared/interfaces/User.interface';

import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-auth-me-page',
  imports: [DatePipe, RouterLink], 
  templateUrl: './auth-me-page.html',
})
export class AuthMePage {


  user = signal<User | null>(null);
  isLoading = signal<boolean>(true);
  router = inject(Router);
  
  constructor() {
    this.getUserData();
  }
  
  getUserData(): void {
    this.isLoading.set(true); 

    this.user.set({
      id: '12345',
      email: 'user@example.com',
      name: 'John Doe',
      created_at: new Date('2023-01-15T10:00:00Z'),
      last_login: new Date('2024-06-10T14:30:00Z'),
      login_count: 42
    });
    this.isLoading.set(false);
    
    
  }

  redirectToMetrics(): void {
    // Logic to redirect to metrics dashboard
    // You can use Angular's Router to navigate programmatically
    // For example:
     this.router.navigate(['/metrics']);
  }

 
}

export default AuthMePage;