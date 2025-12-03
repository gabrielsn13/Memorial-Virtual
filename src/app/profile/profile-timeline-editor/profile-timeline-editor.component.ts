import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimelineService, TimelineItem } from '../timeline.service';
import { ModalController } from '@ionic/angular';
import { TimelineItemModalComponent } from './timeline-item-modal/timeline-item-modal.component';

@Component({
  selector: 'app-profile-timeline-editor',
  templateUrl: './profile-timeline-editor.component.html',
  styleUrls: ['./profile-timeline-editor.component.scss'],
  standalone: false
})
export class ProfileTimelineEditorComponent implements OnInit {
  @ViewChild('imageInput', { static: false }) imageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('videoInput', { static: false }) videoInput!: ElementRef<HTMLInputElement>;
  
  timelineItems: TimelineItem[] = [];
  
  // Editor state
  postText: string = '';
  selectedImage: string | null = null;
  selectedImageFile: File | null = null;
  selectedVideoUrl: string = '';
  
  // User profile image (mock por enquanto)
  userProfileImage: string = 'https://via.placeholder.com/48/1DA1F2/FFFFFF?text=U';

  constructor(
    private timelineService: TimelineService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadTimeline();
    
    // Assinar mudanças na timeline
    this.timelineService.timeline$.subscribe(items => {
      this.timelineItems = items.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  }

  loadTimeline() {
    this.timelineItems = this.timelineService.getTimeline();
  }

  // Verifica se o botão Post deve estar habilitado
  canPost(): boolean {
    return !!(this.postText.trim() || this.selectedImage || this.selectedVideoUrl.trim());
  }

  // Postar novo item
  post() {
    if (!this.canPost()) {
      return;
    }

    this.timelineService.addItem({
      text: this.postText.trim(),
      imageUrl: this.selectedImage || undefined,
      videoUrl: this.selectedVideoUrl.trim() || undefined
    });

    // Limpar campos após postar
    this.postText = '';
    this.selectedImage = null;
    this.selectedImageFile = null;
    this.selectedVideoUrl = '';
    
    // Limpar inputs de arquivo
    if (this.imageInput?.nativeElement) {
      this.imageInput.nativeElement.value = '';
    }
    if (this.videoInput?.nativeElement) {
      this.videoInput.nativeElement.value = '';
    }
  }

  // Upload de imagem
  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      if (file.type.startsWith('image/')) {
        this.selectedImageFile = file;
        
        // Criar preview
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result) {
            this.selectedImage = e.target.result as string;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  triggerImageInput() {
    if (this.imageInput && this.imageInput.nativeElement) {
      this.imageInput.nativeElement.click();
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.selectedImageFile = null;
    if (this.imageInput?.nativeElement) {
      this.imageInput.nativeElement.value = '';
    }
  }

  // Upload de vídeo
  onVideoSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      if (file.type.startsWith('video/')) {
        // Por enquanto, apenas suportamos URL do YouTube
        // Para upload direto, seria necessário processar o arquivo
        console.log('Video file selected:', file);
      }
    }
  }

  triggerVideoInput() {
    if (this.videoInput && this.videoInput.nativeElement) {
      this.videoInput.nativeElement.click();
    }
  }

  // Placeholders para funcionalidades futuras
  openGIFPicker() {
    console.log('GIF picker - funcionalidade em desenvolvimento');
  }

  openPollCreator() {
    console.log('Poll creator - funcionalidade em desenvolvimento');
  }

  openEmojiPicker() {
    console.log('Emoji picker - funcionalidade em desenvolvimento');
  }

  openLocationPicker() {
    console.log('Location picker - funcionalidade em desenvolvimento');
  }

  async openEditItemModal(item: TimelineItem) {
    const modal = await this.modalController.create({
      component: TimelineItemModalComponent,
      componentProps: {
        item: { ...item }
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    if (data && data.item) {
      this.timelineService.updateItem(item.id, {
        text: data.item.text,
        imageUrl: data.item.imageUrl,
        videoUrl: data.item.videoUrl
      });
    }
  }

  deleteItem(item: TimelineItem) {
    this.timelineService.deleteItem(item.id);
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getYouTubeEmbedUrl(url: string): string {
    if (!url) return '';
    
    // Extrair ID do vídeo do YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  }

  isYouTubeUrl(url: string): boolean {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  }
}

