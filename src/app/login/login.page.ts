import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
})
export class LoginPage {
  constructor() {}

  onLoginMethod(method: string) {
    console.log('Login method selected:', method);
    // Implementar lógica de login aqui
  }
}

