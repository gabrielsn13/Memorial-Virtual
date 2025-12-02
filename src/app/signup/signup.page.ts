import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
  standalone: false,
})
export class SignupPage {
  birthday = {
    month: '',
    day: '',
    year: ''
  };

  phone = {
    countryCode: 'BR +55',
    number: ''
  };

  verificationCode = '';
  showCodeInput = false;

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  sendCode() {
    if (this.phone.number) {
      this.showCodeInput = true;
      // Aqui você implementaria a lógica de envio do código
      console.log('Code sent to:', this.phone.countryCode, this.phone.number);
    }
  }

  signUpWithEmail() {
    // Implementar navegação para cadastro com email
    console.log('Sign up with email');
  }

  next() {
    if (this.showCodeInput && this.verificationCode) {
      // Validar código e prosseguir
      console.log('Verification code:', this.verificationCode);
      // Aqui você validaria o código com o backend
      // Por enquanto, redireciona direto para o feed
      this.router.navigate(['/feed']);
    } else if (this.birthday.month && this.birthday.day && this.birthday.year && this.phone.number) {
      this.sendCode();
    }
  }

  isFormValid(): boolean {
    if (this.showCodeInput) {
      return this.verificationCode.length === 6;
    }
    return !!(this.birthday.month && this.birthday.day && this.birthday.year && this.phone.number);
  }
}

