import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('profileImageInput', { static: false }) profileImageInput!: ElementRef<HTMLInputElement>;
  
  activeTab: string = 'profile';
  
  userProfile = {
    name: 'Your Name',
    birthDate: null as Date | null,
    deathDate: null as Date | null,
    biography: '',
    message: 'Always In Our Thoughts, Forever In Our Hearts',
    relationship: 'In memory, family and friends.',
    profileImage: 'https://via.placeholder.com/150/FFB6C1/FFFFFF?text=You'
  };

  timeline: any[] = [];
  selectedFiles: File[] = [];
  maxDate: Date = new Date();

  constructor(
    private actionSheetController: ActionSheetController,
    private platform: Platform
  ) {}

  ngOnInit() {
    // Carregar dados do perfil do usuário
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        // Se for uma imagem única, pode ser para o perfil
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result) {
            this.userProfile.profileImage = e.target.result as string;
          }
        };
        reader.readAsDataURL(file);
      }
      
      // Processar múltiplos arquivos para timeline
      for (let i = 0; i < files.length; i++) {
        const fileItem = files[i];
        if (fileItem.type.startsWith('image/') || fileItem.type.startsWith('video/')) {
          this.selectedFiles.push(fileItem);
          
          // Criar preview
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
              this.timeline.push({
                id: Date.now() + i,
                type: fileItem.type.startsWith('video/') ? 'video' : 'image',
                url: e.target.result as string,
                file: fileItem
              });
            }
          };
          reader.readAsDataURL(fileItem);
        }
      }
    }
    
    // Limpar o input
    if (target) {
      target.value = '';
    }
  }

  removeMemento(id: number) {
    const mementoIndex = this.timeline.findIndex(m => m.id === id);
    if (mementoIndex !== -1) {
      this.timeline.splice(mementoIndex, 1);
      this.selectedFiles.splice(mementoIndex, 1);
    }
  }

  saveProfile() {
    console.log('Saving profile:', this.userProfile);
    // Implementar lógica de salvamento
  }

  triggerFileInput() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  async openProfileImageMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Alterar foto de perfil',
      cssClass: 'profile-image-action-sheet',
      buttons: [
        {
          text: 'Escolher da galeria',
          icon: 'images-outline',
          handler: () => {
            this.selectFromGallery();
          }
        },
        {
          text: 'Tirar foto',
          icon: 'camera-outline',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Importar do Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.importFromFacebook();
          }
        },
        {
          text: 'Excluir foto',
          icon: 'trash-outline',
          cssClass: 'danger-option',
          handler: () => {
            this.deleteProfileImage();
          }
        }
      ]
    });

    await actionSheet.present();
  }

  async selectFromGallery() {
    // Usar input file para selecionar da galeria
    this.triggerProfileImageInput();
  }

  async takePhoto() {
    // Usar input file com atributo capture para tirar foto
    if (this.profileImageInput && this.profileImageInput.nativeElement) {
      this.profileImageInput.nativeElement.setAttribute('capture', 'environment');
      this.profileImageInput.nativeElement.setAttribute('accept', 'image/*');
      this.profileImageInput.nativeElement.click();
      // Remover atributos após clicar
      setTimeout(() => {
        if (this.profileImageInput && this.profileImageInput.nativeElement) {
          this.profileImageInput.nativeElement.removeAttribute('capture');
        }
      }, 100);
    }
  }

  triggerProfileImageInput() {
    if (this.profileImageInput && this.profileImageInput.nativeElement) {
      this.profileImageInput.nativeElement.click();
    }
  }

  onProfileImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result) {
            this.userProfile.profileImage = e.target.result as string;
          }
        };
        reader.readAsDataURL(file);
      }
    }
    
    // Limpar o input
    if (target) {
      target.value = '';
    }
  }

  importFromFacebook() {
    // Implementar integração com Facebook
    console.log('Importar do Facebook');
    alert('Funcionalidade de importação do Facebook será implementada em breve.');
  }

  deleteProfileImage() {
    this.userProfile.profileImage = 'https://via.placeholder.com/150/FFB6C1/FFFFFF?text=You';
  }
}

