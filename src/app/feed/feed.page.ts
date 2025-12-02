import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      relationship: 'In memory, son, daughter, wife.'
    },
    {
      id: 2,
      name: 'John Smith',
      birthDate: '23.05.1945',
      deathDate: '15.03.2020',
      imageUrl: 'https://via.placeholder.com/200/87CEEB/FFFFFF?text=JS',
      message: 'A life well lived, a heart well loved',
      relationship: 'In memory, family and friends.'
    },
    {
      id: 3,
      name: 'Maria Silva',
      birthDate: '10.12.1950',
      deathDate: '22.08.2021',
      imageUrl: 'https://via.placeholder.com/200/DDA0DD/FFFFFF?text=MS',
      message: 'Her kindness touched everyone she met',
      relationship: 'In memory, children and grandchildren.'
    },
    {
      id: 4,
      name: 'Robert Johnson',
      birthDate: '05.07.1938',
      deathDate: '11.11.2022',
      imageUrl: 'https://via.placeholder.com/200/98D8C8/FFFFFF?text=RJ',
      message: 'Forever in our hearts, always remembered',
      relationship: 'In memory, wife and family.'
    },
    {
      id: 5,
      name: 'Anna Williams',
      birthDate: '28.02.1942',
      deathDate: '03.06.2023',
      imageUrl: 'https://via.placeholder.com/200/F0E68C/FFFFFF?text=AW',
      message: 'A beautiful soul who brought joy to all',
      relationship: 'In memory, loved ones.'
    },
    {
      id: 6,
      name: 'David Thompson',
      birthDate: '12.03.1975',
      deathDate: '15.01.2025',
      imageUrl: 'https://via.placeholder.com/200/A8E6CF/FFFFFF?text=DT',
      message: 'A loving father and devoted friend',
      relationship: 'In memory, wife, children, and family.'
    },
    {
      id: 7,
      name: 'Sarah Martinez',
      birthDate: '08.07.1980',
      deathDate: '22.04.2025',
      imageUrl: 'https://via.placeholder.com/200/FFD3A5/FFFFFF?text=SM',
      message: 'Her smile lit up every room she entered',
      relationship: 'In memory, husband, children, and friends.'
    },
    {
      id: 8,
      name: 'James Wilson',
      birthDate: '30.11.1968',
      deathDate: '10.08.2025',
      imageUrl: 'https://via.placeholder.com/200/C7CEEA/FFFFFF?text=JW',
      message: 'A man of integrity, wisdom, and kindness',
      relationship: 'In memory, family and community.'
    },
    {
      id: 9,
      name: 'Napoleon Bonaparte',
      birthDate: '15.08.1769',
      deathDate: '05.05.1821',
      imageUrl: 'https://via.placeholder.com/200/8B7355/FFFFFF?text=NB',
      message: 'Emperor of the French, military genius, and one of history\'s most influential figures',
      relationship: 'In memory, a figure who shaped European history.',
      isPublicFigure: true,
      isHistoricalFigure: true
    }
  ];

  profiles: MemorialProfile[] = [];
  availableYears: number[] = [];
  selectedYear: number = 0;
  searchYear: number | null = null;
  currentYear: number = new Date().getFullYear();
  showSearch: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Extrair anos únicos das datas de morte
    this.extractAvailableYears();
    // Selecionar o ano mais recente por padrão
    if (this.availableYears.length > 0) {
      this.selectedYear = this.availableYears[0];
      this.filterProfilesByYear(this.selectedYear);
    }
  }

  extractAvailableYears() {
    const yearsSet = new Set<number>();
    this.allProfiles.forEach(profile => {
      // Extrair ano da data de morte (formato: DD.MM.YYYY)
      const year = parseInt(profile.deathDate.split('.')[2]);
      if (!isNaN(year)) {
        yearsSet.add(year);
      }
    });
    
    // Adicionar todos os anos de 2025 até 1821 para permitir scroll completo
    const currentYear = new Date().getFullYear();
    const startYear = 1821;
    for (let year = currentYear; year >= startYear; year--) {
      yearsSet.add(year);
    }
    
    this.availableYears = Array.from(yearsSet).sort((a, b) => b - a); // Ordenar do mais recente para o mais antigo
  }

  filterProfilesByYear(year: number) {
    this.selectedYear = year;
    this.profiles = this.allProfiles.filter(profile => {
      const profileYear = parseInt(profile.deathDate.split('.')[2]);
      return profileYear === year;
    });
  }

  selectYear(year: number) {
    this.filterProfilesByYear(year);
    this.searchYear = null; // Limpar busca ao selecionar do scroll
  }

  onYearSearch() {
    if (this.searchYear && this.searchYear >= 1821 && this.searchYear <= this.currentYear) {
      // Verificar se o ano existe na lista
      if (this.availableYears.includes(this.searchYear)) {
        this.filterProfilesByYear(this.searchYear);
        this.scrollToYear(this.searchYear);
      } else {
        // Se o ano não tem perfis, ainda permite selecionar para mostrar mensagem
        this.filterProfilesByYear(this.searchYear);
      }
    }
  }

  clearYearSearch() {
    this.searchYear = null;
    // Manter o ano selecionado atual
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchYear = null;
    }
  }

  scrollToYear(year: number) {
    // Scroll suave para o ano selecionado no scroll horizontal
    setTimeout(() => {
      const yearElement = document.querySelector(`[data-year="${year}"]`);
      if (yearElement) {
        yearElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 100);
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
}

