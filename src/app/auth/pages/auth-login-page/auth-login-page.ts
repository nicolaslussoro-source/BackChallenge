import { FormUtils } from './../../../utils/FormUtils';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-auth-login-page',
  imports: [
    ReactiveFormsModule, 
    RouterLink 
  ],
  templateUrl: './auth-login-page.html',
})
export class AuthLoginPage {
  fb: FormBuilder = new FormBuilder();
  formUtils = FormUtils;
  
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)/)]],
  });

  

  

  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    const credentials = this.loginForm.value;
    console.log('Credenciales enviadas:', credentials);

  }
}

export default AuthLoginPage;