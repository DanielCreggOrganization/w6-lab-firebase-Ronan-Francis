import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IonicModule } from '@ionic/angular';
import { 
  mailOutline, 
  lockClosedOutline, 
  eyeOutline, 
  eyeOffOutline,
  logInOutline,
  personAddOutline 
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class LoginPage {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor() {
    addIcons({
      'mail-outline': mailOutline,
      'lock-closed-outline': lockClosedOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline,
      'log-in-outline': logInOutline,
      'person-add-outline': personAddOutline
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.signInUser(email as string, password as string);
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }

  async onResetPassword() {
    const email = this.loginForm.get('email')?.value;
    if (email) {
      try {
        await this.authService.resetPassword(email);
        console.log('Password reset email sent');
      } catch (error) {
        console.error('Password reset failed', error);
      }
    }
  }

  onCreateAccount() {
    this.router.navigate(['/register']);
  }
}