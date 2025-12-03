import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TimelineItem {
  id: string;
  text: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private timelineItems: TimelineItem[] = [];
  private timelineSubject = new BehaviorSubject<TimelineItem[]>([]);
  public timeline$: Observable<TimelineItem[]> = this.timelineSubject.asObservable();

  constructor() {
    // Carregar dados de exemplo para teste
    this.loadTestData();
  }

  /**
   * Carrega dados de teste
   */
  private loadTestData(): void {
    const testItems: TimelineItem[] = [
      {
        id: '1',
        text: 'Um momento especial que sempre guardarei na memória. Este dia foi marcante e significativo.',
        imageUrl: 'https://via.placeholder.com/600x400/FFB6C1/FFFFFF?text=Memory+1',
        createdAt: new Date(2024, 0, 15)
      },
      {
        id: '2',
        text: 'Celebrando a vida e os momentos felizes que compartilhamos juntos.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        createdAt: new Date(2024, 1, 20)
      },
      {
        id: '3',
        text: 'Uma foto que captura um momento único e especial da nossa história.',
        imageUrl: 'https://via.placeholder.com/600x400/B0E0E6/FFFFFF?text=Memory+2',
        createdAt: new Date(2024, 2, 10)
      }
    ];

    this.timelineItems = testItems;
    this.timelineSubject.next([...this.timelineItems]);
  }

  /**
   * Obtém todos os itens da timeline ordenados por data (mais recente primeiro)
   */
  getTimeline(): TimelineItem[] {
    return [...this.timelineItems].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /**
   * Adiciona um novo item à timeline
   */
  addItem(item: Omit<TimelineItem, 'id' | 'createdAt'>): TimelineItem {
    const newItem: TimelineItem = {
      ...item,
      id: this.generateId(),
      createdAt: new Date()
    };

    this.timelineItems.push(newItem);
    this.timelineSubject.next([...this.timelineItems]);
    return newItem;
  }

  /**
   * Atualiza um item existente
   */
  updateItem(id: string, updates: Partial<Omit<TimelineItem, 'id' | 'createdAt'>>): TimelineItem | null {
    const index = this.timelineItems.findIndex(item => item.id === id);
    
    if (index === -1) {
      return null;
    }

    this.timelineItems[index] = {
      ...this.timelineItems[index],
      ...updates
    };

    this.timelineSubject.next([...this.timelineItems]);
    return this.timelineItems[index];
  }

  /**
   * Remove um item da timeline
   */
  deleteItem(id: string): boolean {
    const index = this.timelineItems.findIndex(item => item.id === id);
    
    if (index === -1) {
      return false;
    }

    this.timelineItems.splice(index, 1);
    this.timelineSubject.next([...this.timelineItems]);
    return true;
  }

  /**
   * Obtém um item específico por ID
   */
  getItemById(id: string): TimelineItem | undefined {
    return this.timelineItems.find(item => item.id === id);
  }

  /**
   * Gera um ID único para novos itens
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

