import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {

  }

  async register(form: any) {
    try {
      const { email, password } = form.value;
      await this.authService.register(email, password);
      alert('Registration successful!');
      this.router.navigate(['tasks']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
