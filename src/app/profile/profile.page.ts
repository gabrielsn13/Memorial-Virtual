import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, Platform, AlertController, ToastController } from '@ionic/angular';

interface FamilyMember {
  id: number;
  name: string;
  role: 'leader' | 'member';
  avatar: string;
  email?: string;
  isCurrentUser?: boolean;
}

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

  // Family Management
  maxFamilyMembers: number = 6;
  familyAddress: string = 'R. Osório Ferreira - Subsetor Leste - 5 (L-5), Ribeirão Preto - SP, 14090-520, Brazil';
  familyMembers: FamilyMember[] = [
    {
      id: 1,
      name: 'Você',
      role: 'leader',
      avatar: this.userProfile.profileImage,
      isCurrentUser: true
    },
    {
      id: 2,
      name: 'Giullio Gerolamo',
      role: 'member',
      avatar: 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=GG'
    },
    {
      id: 3,
      name: 'Lukas Rosa',
      role: 'member',
      avatar: 'https://via.placeholder.com/150/2196F3/FFFFFF?text=LR'
    },
    {
      id: 4,
      name: 'Cauã Boeniares Shmith',
      role: 'member',
      avatar: 'https://via.placeholder.com/150/FF9800/FFFFFF?text=CBS'
    },
    {
      id: 5,
      name: 'Giovanni Enrico',
      role: 'member',
      avatar: 'https://via.placeholder.com/150/9C27B0/FFFFFF?text=GE'
    },
    {
      id: 6,
      name: 'botechi',
      role: 'member',
      avatar: 'https://via.placeholder.com/150/E91E63/FFFFFF?text=B'
    }
  ];
  inviteLink: string = 'https://www.afteer.com/family/invite/abc123xyz';

  constructor(
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private alertController: AlertController,
    private toastController: ToastController
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

  // Family Management Methods
  get usedSlots(): number {
    return this.familyMembers.length;
  }

  get availableSlots(): number {
    return this.maxFamilyMembers - this.usedSlots;
  }

  get isMaxMembers(): boolean {
    return this.usedSlots >= this.maxFamilyMembers;
  }

  getMemberRoleLabel(member: FamilyMember): string {
    return member.role === 'leader' ? 'Administrador da Família' : 'Membro da Família';
  }

  async viewMemberDetails(member: FamilyMember) {
    const alert = await this.alertController.create({
      header: member.name,
      message: `
        <p><strong>Função:</strong> ${this.getMemberRoleLabel(member)}</p>
        ${member.email ? `<p><strong>E-mail:</strong> ${member.email}</p>` : ''}
      `,
      buttons: ['Fechar']
    });
    await alert.present();
  }

  async removeMember(member: FamilyMember) {
    if (member.isCurrentUser) {
      const alert = await this.alertController.create({
        header: 'Ação não permitida',
        message: 'Você não pode remover a si mesmo do plano.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (member.role === 'leader') {
      const alert = await this.alertController.create({
        header: 'Ação não permitida',
        message: 'Você não pode remover o administrador do plano.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Remover membro',
      message: `Tem certeza que deseja remover ${member.name} do plano?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Remover',
          role: 'destructive',
          handler: () => {
            const index = this.familyMembers.findIndex(m => m.id === member.id);
            if (index !== -1) {
              this.familyMembers.splice(index, 1);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editAddress() {
    const alert = await this.alertController.create({
      header: 'Editar endereço',
      inputs: [
        {
          name: 'address',
          type: 'text',
          value: this.familyAddress,
          placeholder: 'Digite o endereço'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (data) => {
            if (data.address) {
              this.familyAddress = data.address;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async copyInviteLink() {
    try {
      await navigator.clipboard.writeText(this.inviteLink);
      const toast = await this.toastController.create({
        message: 'Link copiado para a área de transferência!',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    } catch (err) {
      console.error('Erro ao copiar link:', err);
      const toast = await this.toastController.create({
        message: 'Erro ao copiar link. Tente novamente.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    }
  }

  shareViaMessenger() {
    const url = `https://www.messenger.com/share?link=${encodeURIComponent(this.inviteLink)}`;
    window.open(url, '_blank');
  }

  shareViaWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(`Junte-se ao meu plano familiar: ${this.inviteLink}`)}`;
    window.open(url, '_blank');
  }

  shareViaEmail() {
    const subject = encodeURIComponent('Convite para o plano familiar');
    const body = encodeURIComponent(`Olá,\n\nVocê foi convidado para fazer parte do meu plano familiar.\n\nLink de convite: ${this.inviteLink}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
}

