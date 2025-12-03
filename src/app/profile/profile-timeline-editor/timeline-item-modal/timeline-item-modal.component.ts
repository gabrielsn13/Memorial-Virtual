import { Component, Input, ViewChild, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TimelineItem } from '../../timeline.service';

@Component({
  selector: 'app-timeline-item-modal',
  templateUrl: './timeline-item-modal.component.html',
  styleUrls: ['./timeline-item-modal.component.scss'],
  standalone: false
})
export class TimelineItemModalComponent implements OnInit, OnChanges {
  @ViewChild('imageInput', { static: false }) imageInput!: ElementRef<HTMLInputElement>;
  
  @Input() item: TimelineItem | null = null;

  formData = {
    text: '',
    imageUrl: '',
    videoUrl: ''
  };

  selectedImageFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.loadItemData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && !changes['item'].firstChange) {
      this.loadItemData();
    }
  }

  private loadItemData() {
    if (this.item) {
      this.formData = {
        text: this.item.text || '',
        imageUrl: this.item.imageUrl || '',
        videoUrl: this.item.videoUrl || ''
      };
      
      if (this.item.imageUrl) {
        this.imagePreview = this.item.imageUrl;
      }
    } else {
      // Reset form for new item
      this.formData = {
        text: '',
        imageUrl: '',
        videoUrl: ''
      };
      this.imagePreview = null;
      this.selectedImageFile = null;
    }
  }

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
            this.imagePreview = e.target.result as string;
            this.formData.imageUrl = this.imagePreview;
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

  triggerImageInput() {
    if (this.imageInput && this.imageInput.nativeElement) {
      this.imageInput.nativeElement.click();
    }
  }

  removeImage() {
    this.imagePreview = null;
    this.formData.imageUrl = '';
    this.selectedImageFile = null;
  }

  save() {
    const hasText = this.formData.text.trim().length > 0;
    const hasImage = !!this.formData.imageUrl;
    const hasVideo = this.formData.videoUrl.trim().length > 0;

    if (!hasText && !hasImage && !hasVideo) {
      // Pelo menos um campo deve ser preenchido
      return;
    }

    const itemData: Partial<TimelineItem> = {
      text: this.formData.text.trim() || '',
      imageUrl: this.formData.imageUrl || undefined,
      videoUrl: this.formData.videoUrl.trim() || undefined
    };

    // Se estiver editando, manter o ID
    if (this.item && this.item.id) {
      itemData.id = this.item.id;
    }

    this.modalController.dismiss({
      item: itemData
    });
  }

  cancel() {
    this.modalController.dismiss();
  }

  isFormValid(): boolean {
    const hasText = this.formData.text.trim().length > 0;
    const hasImage = !!this.formData.imageUrl;
    const hasVideo = this.formData.videoUrl.trim().length > 0;
    return hasText || hasImage || hasVideo;
  }
}

