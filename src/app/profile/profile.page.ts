import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  
  activeTab: string = 'profile';
  
  userProfile = {
    name: 'Your Name',
    birthDate: null as Date | null,
    deathDate: null as Date | null,
    biography: '',
    message: 'Always In Our Thoughts, Forever In Our Hearts',
    relationship: 'In memory, family and friends.'
  };

  mementos: any[] = [];
  selectedFiles: File[] = [];
  maxDate: Date = new Date();

  constructor() {}

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
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
          this.selectedFiles.push(file);
          
          // Criar preview
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
              this.mementos.push({
                id: Date.now() + i,
                type: file.type.startsWith('video/') ? 'video' : 'image',
                url: e.target.result as string,
                file: file
              });
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  removeMemento(id: number) {
    const mementoIndex = this.mementos.findIndex(m => m.id === id);
    if (mementoIndex !== -1) {
      this.mementos.splice(mementoIndex, 1);
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
}

