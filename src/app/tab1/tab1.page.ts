import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  currentSlide = 0;
  slides = [0, 1, 2, 3]; // 4 slides

  formData = {
    nome: '',
    email: '',
    phone: ''
  };

  constructor() {}

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Aqui você pode adicionar a lógica de envio do formulário
  }
}
