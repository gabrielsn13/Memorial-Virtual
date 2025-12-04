import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {}

  async ngOnInit() {
    // Configurar StatusBar quando a plataforma estiver pronta
    if (this.platform.is('capacitor')) {
      try {
        // Desativar overlay para que a Status Bar fique visível
        await StatusBar.setOverlaysWebView({ overlay: false });
        
        // Configurar estilo da Status Bar
        await StatusBar.setStyle({ style: Style.Default });
        
        // Mostrar a Status Bar
        await StatusBar.show();
      } catch (error) {
        console.log('StatusBar não disponível:', error);
      }
    }
  }
}
