import { Component } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-auth-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {
  items = [
    { label: 'Login', icon: 'log-in', route: '/auth/login' },
    { label: 'Register', icon: 'user-plus', route: '/auth/register' },
    { label: 'Me', icon: 'user', route: '/auth/me' },
  ];
 }

export default AuthLayout;