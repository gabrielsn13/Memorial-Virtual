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
  timelineItems: TimelineItem[] = [];

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

  async openAddItemModal() {
    const modal = await this.modalController.create({
      component: TimelineItemModalComponent,
      componentProps: {
        item: null
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    if (data && data.item) {
      if (data.item.id) {
        // Atualizar item existente
        this.timelineService.updateItem(data.item.id, {
          text: data.item.text,
          imageUrl: data.item.imageUrl,
          videoUrl: data.item.videoUrl
        });
      } else {
        // Adicionar novo item
        this.timelineService.addItem({
          text: data.item.text,
          imageUrl: data.item.imageUrl,
          videoUrl: data.item.videoUrl
        });
      }
    }
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

