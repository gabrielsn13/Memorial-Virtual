import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
})
export class LoginPage {
  showPhoneForm: boolean = false;
  phoneEmail: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLoginMethod(method: string) {
    if (method === 'phone') {
      this.showPhoneForm = true;
    } else {
      console.log('Login method selected:', method);
      // Implementar lógica de login para outros métodos
    }
  }

  goBack() {
    this.showPhoneForm = false;
    this.phoneEmail = '';
    this.password = '';
  }

  isFormValid(): boolean {
    return !!(this.phoneEmail.trim() && this.password.trim());
  }

  onLogin() {
    if (this.isFormValid()) {
      // Aqui você implementaria a lógica de autenticação
      console.log('Logging in with:', this.phoneEmail);
      // Redirecionar para o feed
      this.router.navigate(['/feed']);
    }
  }
}

