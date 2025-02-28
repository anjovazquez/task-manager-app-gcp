// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [SharedModule]

})
export class LoginComponent {
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  onLogin(form: any) {
    const { email, password } = form.value;
    this.authService.login(email, password).then(() => {
      // Redirigir después de login exitoso
      this.router.navigate(['tasks']);
    });
  }
}
