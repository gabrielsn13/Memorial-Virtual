import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';

interface MemorialProfile {
  id: number;
  name: string;
  birthDate: string;
  deathDate: string;
  imageUrl: string;
  message: string;
  relationship: string;
  isPublicFigure?: boolean;
  isHistoricalFigure?: boolean;
  // Novos campos para posts
  createdAt: Date;
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  isSaved: boolean;
}

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss'],
  standalone: false,
})
export class FeedPage implements OnInit {
  allProfiles: MemorialProfile[] = [
    {
      id: 1,
      name: 'Margaret Evans',
      birthDate: '17.04.1932',
      deathDate: '07.09.2019',
      imageUrl: 'https://via.placeholder.com/200/FFB6C1/FFFFFF?text=ME',
      message: 'She made every Sunday taste like home',
      relationship: 'In memory, son, daughter, wife.',
      createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutos atrás
      likesCount: 24,
      isLiked: false,
      commentsCount: 5,
      isSaved: false
    },
    {
      id: 2,
      name: 'John Smith',
      birthDate: '23.05.1945',
      deathDate: '15.03.2020',
      imageUrl: 'https://via.placeholder.com/200/87CEEB/FFFFFF?text=JS',
      message: 'A life well lived, a heart well loved',
      relationship: 'In memory, family and friends.',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hora atrás
      likesCount: 156,
      isLiked: true,
      commentsCount: 23,
      isSaved: true
    },
    {
      id: 3,
      name: 'Maria Silva',
      birthDate: '10.12.1950',
      deathDate: '22.08.2021',
      imageUrl: 'https://via.placeholder.com/200/DDA0DD/FFFFFF?text=MS',
      message: 'Her kindness touched everyone she met',
      relationship: 'In memory, children and grandchildren.',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
      likesCount: 89,
      isLiked: false,
      commentsCount: 12,
      isSaved: false
    },
    {
      id: 4,
      name: 'Robert Johnson',
      birthDate: '05.07.1938',
      deathDate: '11.11.2022',
      imageUrl: 'https://via.placeholder.com/200/98D8C8/FFFFFF?text=RJ',
      message: 'Forever in our hearts, always remembered',
      relationship: 'In memory, wife and family.',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 semana atrás
      likesCount: 342,
      isLiked: true,
      commentsCount: 45,
      isSaved: true
    },
    {
      id: 5,
      name: 'Anna Williams',
      birthDate: '28.02.1942',
      deathDate: '03.06.2023',
      imageUrl: 'https://via.placeholder.com/200/F0E68C/FFFFFF?text=AW',
      message: 'A beautiful soul who brought joy to all',
      relationship: 'In memory, loved ones.',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 mês atrás
      likesCount: 567,
      isLiked: false,
      commentsCount: 78,
      isSaved: false
    },
    {
      id: 6,
      name: 'David Thompson',
      birthDate: '12.03.1975',
      deathDate: '15.01.2025',
      imageUrl: 'https://via.placeholder.com/200/A8E6CF/FFFFFF?text=DT',
      message: 'A loving father and devoted friend',
      relationship: 'In memory, wife, children, and family.',
      createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
      likesCount: 12,
      isLiked: false,
      commentsCount: 2,
      isSaved: false
    },
    {
      id: 7,
      name: 'Sarah Martinez',
      birthDate: '08.07.1980',
      deathDate: '22.04.2025',
      imageUrl: 'https://via.placeholder.com/200/FFD3A5/FFFFFF?text=SM',
      message: 'Her smile lit up every room she entered',
      relationship: 'In memory, husband, children, and friends.',
      createdAt: new Date(), // Agora mesmo
      likesCount: 0,
      isLiked: false,
      commentsCount: 0,
      isSaved: false
    },
    {
      id: 8,
      name: 'James Wilson',
      birthDate: '30.11.1968',
      deathDate: '10.08.2025',
      imageUrl: 'https://via.placeholder.com/200/C7CEEA/FFFFFF?text=JW',
      message: 'A man of integrity, wisdom, and kindness',
      relationship: 'In memory, family and community.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      likesCount: 234,
      isLiked: true,
      commentsCount: 34,
      isSaved: true
    },
    {
      id: 9,
      name: 'Napoleon Bonaparte',
      birthDate: '15.08.1769',
      deathDate: '05.05.1821',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Napoleon_Bonaparte.jpg',
      message: 'Emperor of the French, military genius, and one of history\'s most influential figures',
      relationship: 'In memory, a figure who shaped European history.',
      isPublicFigure: true,
      isHistoricalFigure: true,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 dia atrás
      likesCount: 1234,
      isLiked: true,
      commentsCount: 156,
      isSaved: true
    },
    {
      id: 10,
      name: 'John Lennon',
      birthDate: '09.10.1940',
      deathDate: '08.12.1980',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/85/John_Lennon_1969_%28cropped%29.jpg',
      message: 'Musician, songwriter, peace activist, and co-founder of The Beatles',
      relationship: 'In memory, a voice for peace and love that continues to inspire generations.',
      isPublicFigure: true,
      isHistoricalFigure: true,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 dias atrás
      likesCount: 2345,
      isLiked: true,
      commentsCount: 289,
      isSaved: true
    },
    {
      id: 11,
      name: 'Michael Jackson',
      birthDate: '29.08.1958',
      deathDate: '25.06.2009',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg',
      message: 'The King of Pop, legendary performer, and one of the most influential entertainers of all time',
      relationship: 'In memory, an icon whose music and dance continue to inspire millions worldwide.',
      isPublicFigure: true,
      isHistoricalFigure: true,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 dias atrás
      likesCount: 4567,
      isLiked: false,
      commentsCount: 567,
      isSaved: true
    },
    {
      id: 12,
      name: 'Kurt Cobain',
      birthDate: '20.02.1967',
      deathDate: '05.04.1994',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Kurt_Cobain_1991.jpg',
      message: 'Singer, songwriter, and guitarist of Nirvana, voice of Generation X',
      relationship: 'In memory, a musical genius whose raw emotion and authenticity changed rock music forever.',
      isPublicFigure: true,
      isHistoricalFigure: true,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 dias atrás
      likesCount: 3456,
      isLiked: true,
      commentsCount: 412,
      isSaved: false
    }
  ];

  profiles: MemorialProfile[] = [];
  maxDate: string = new Date().toISOString();
  
  // Filtro expandível
  isFilterExpanded: boolean = false;
  
  // Filtros
  filterText: string = '';
  filterStartDate: string | null = null;
  filterEndDate: string | null = null;
  filterCategories = {
    publicFigure: false,
    family: false,
    individuals: false
  };

  @ViewChild('startDateModal', { static: false }) startDateModal!: IonModal;
  @ViewChild('endDateModal', { static: false }) endDateModal!: IonModal;

  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Inicializar com todos os perfis
    this.applyFilters();
  }

  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  applyFilters() {
    let filtered = [...this.allProfiles];

    // Filtro por texto (nome ou mensagem)
    if (this.filterText && this.filterText.trim()) {
      const searchText = this.filterText.toLowerCase().trim();
      filtered = filtered.filter(profile => 
        profile.name.toLowerCase().includes(searchText) ||
        profile.message.toLowerCase().includes(searchText) ||
        profile.relationship.toLowerCase().includes(searchText)
      );
    }

    // Filtro por período de data (data de morte)
    if (this.filterStartDate || this.filterEndDate) {
      filtered = filtered.filter(profile => {
        const deathDate = this.parseDate(profile.deathDate);
        if (!deathDate) return false;

        const startDate = this.filterStartDate ? new Date(this.filterStartDate) : null;
        const endDate = this.filterEndDate ? new Date(this.filterEndDate) : null;

        if (startDate && deathDate < startDate) return false;
        if (endDate && deathDate > endDate) return false;

        return true;
      });
    }

    // Filtro por categorias
    const hasCategoryFilter = this.filterCategories.publicFigure || 
                             this.filterCategories.family || 
                             this.filterCategories.individuals;

    if (hasCategoryFilter) {
      filtered = filtered.filter(profile => {
        // Figura pública
        if (this.filterCategories.publicFigure && 
            (profile.isPublicFigure || profile.isHistoricalFigure)) {
          return true;
        }

        // Família (verifica se relationship contém palavras relacionadas a família)
        if (this.filterCategories.family) {
          const relationshipLower = profile.relationship.toLowerCase();
          const familyKeywords = ['family', 'família', 'wife', 'husband', 'son', 'daughter', 
                                 'children', 'filhos', 'filhas', 'esposa', 'esposo', 'pai', 'mãe',
                                 'parent', 'parents', 'grandchildren', 'netos'];
          if (familyKeywords.some(keyword => relationshipLower.includes(keyword))) {
            return true;
          }
        }

        // Indivíduos (não é figura pública e não é família)
        if (this.filterCategories.individuals) {
          const isPublic = profile.isPublicFigure || profile.isHistoricalFigure;
          const relationshipLower = profile.relationship.toLowerCase();
          const familyKeywords = ['family', 'família', 'wife', 'husband', 'son', 'daughter'];
          const isFamily = familyKeywords.some(keyword => relationshipLower.includes(keyword));
          
          if (!isPublic && !isFamily) {
            return true;
          }
        }

        return false;
      });
    }

    this.profiles = filtered;
  }

  parseDate(dateString: string): Date | null {
    // Formato: DD.MM.YYYY
    const parts = dateString.split('.');
    if (parts.length !== 3) return null;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mês é 0-indexed
    const year = parseInt(parts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    
    return new Date(year, month, day);
  }

  clearTextFilter() {
    this.filterText = '';
    this.applyFilters();
  }

  clearStartDate() {
    this.filterStartDate = null;
    this.applyFilters();
  }

  clearEndDate() {
    this.filterEndDate = null;
    this.applyFilters();
  }

  clearAllFilters() {
    this.filterText = '';
    this.filterStartDate = null;
    this.filterEndDate = null;
    this.filterCategories = {
      publicFigure: false,
      family: false,
      individuals: false
    };
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(this.filterText && this.filterText.trim()) ||
           !!this.filterStartDate ||
           !!this.filterEndDate ||
           this.filterCategories.publicFigure ||
           this.filterCategories.family ||
           this.filterCategories.individuals;
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.filterText && this.filterText.trim()) count++;
    if (this.filterStartDate) count++;
    if (this.filterEndDate) count++;
    if (this.filterCategories.publicFigure) count++;
    if (this.filterCategories.family) count++;
    if (this.filterCategories.individuals) count++;
    return count;
  }

  openStartDatePicker() {
    if (this.startDateModal) {
      this.startDateModal.present();
    }
  }

  openEndDatePicker() {
    if (this.endDateModal) {
      this.endDateModal.present();
    }
  }

  onStartDateChange() {
    if (this.startDateModal) {
      this.startDateModal.dismiss();
    }
  }

  onEndDateChange() {
    if (this.endDateModal) {
      this.endDateModal.dismiss();
    }
  }

  formatDateForDisplay(dateString: string | null): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}.${month}.${year}`;
    } catch {
      return '';
    }
  }

  openProfile(profileId: number) {
    this.router.navigate(['/biography', profileId]);
  }

  navigateToFeed() {
    // Já está no feed
  }

  navigateToFriends() {
    // Implementar navegação para amigos
    console.log('Navigate to friends');
  }

  navigateToCreate() {
    // Implementar navegação para criar novo memorial
    console.log('Navigate to create');
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    // Limpar dados de autenticação/sessão do usuário
    // Aqui você implementaria a lógica de logout (limpar tokens, storage, etc.)
    console.log('Logging out user...');
    
    // Redirecionar para a tela home
    this.router.navigate(['/']);
  }

  // ============================================
  // FUNÇÕES DE POST (Like, Comentários, Favorito)
  // ============================================

  /**
   * Calcula o tempo relativo desde a postagem (estilo Instagram)
   */
  getTimeAgo(createdAt: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffSeconds < 60) {
      return 'Agora mesmo';
    } else if (diffMinutes < 60) {
      return `Há ${diffMinutes} min`;
    } else if (diffHours < 24) {
      return `Há ${diffHours} h`;
    } else if (diffDays < 7) {
      return `Há ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
    } else if (diffWeeks < 4) {
      return `Há ${diffWeeks} ${diffWeeks === 1 ? 'semana' : 'semanas'}`;
    } else if (diffMonths < 12) {
      return `Há ${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`;
    } else {
      return createdAt.toLocaleDateString('pt-BR');
    }
  }

  /**
   * Alterna o like do post
   */
  toggleLike(profile: MemorialProfile) {
    profile.isLiked = !profile.isLiked;
    if (profile.isLiked) {
      profile.likesCount++;
    } else {
      profile.likesCount = Math.max(0, profile.likesCount - 1);
    }
  }

  /**
   * Alterna o favorito do post
   */
  toggleSave(profile: MemorialProfile) {
    profile.isSaved = !profile.isSaved;
  }

  /**
   * Abre modal de comentários
   */
  async openComments(profile: MemorialProfile) {
    // Por enquanto, apenas mostra um alerta
    // Você pode criar um componente de modal de comentários depois
    const modal = await this.modalController.create({
      component: null, // Criar componente de comentários depois
      componentProps: {
        profile: profile
      },
      cssClass: 'comments-modal'
    });

    // Por enquanto, apenas log
    console.log('Abrir comentários para:', profile.name);
    // await modal.present();
  }
}

