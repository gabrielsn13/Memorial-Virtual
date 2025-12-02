import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface BiographyItem {
  id: number;
  type: 'text' | 'photo' | 'video';
  title?: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  caption?: string;
}

@Component({
  selector: 'app-biography',
  templateUrl: 'biography.page.html',
  styleUrls: ['biography.page.scss'],
  standalone: false,
})
export class BiographyPage implements OnInit {
  profileId: number = 0;
  
  profile = {
    id: 1,
    name: 'Margaret Evans',
    birthDate: '17.04.1932',
    deathDate: '07.09.2019',
    imageUrl: 'https://via.placeholder.com/200/FFB6C1/FFFFFF?text=ME',
    message: 'She made every Sunday taste like home',
    relationship: 'In memory, son, daughter, wife.',
    biography: {
      title: 'Biography',
      subtitle: 'Formative Experiences: Roots in Oberpfaffenhofen.',
      text: 'Margaret Evans was born in Munich and spent her formative years in Oberpfaffenhofen, a small town that shaped her character and values. Raised by her father Ludwig, a dedicated history teacher, and her mother Elsa, a loving homemaker, Margaret\'s childhood was enriched by a vibrant garden that became her sanctuary. The garden, filled with flowers and vegetables, taught her patience, care, and the beauty of nurturing life. These early experiences in Oberpfaffenhofen laid the foundation for the compassionate and resilient woman she would become.'
    },
    personalReflection: {
      author: 'Margaret, 35',
      text: 'Thank you for this journey through time. While creating the page for my mom, I laughed, I cried... and started over. And then — I felt her. Right here. Even though she\'s been gone for a year'
    }
  };

  biographyItems: BiographyItem[] = [
    {
      id: 1,
      type: 'photo',
      imageUrl: 'https://via.placeholder.com/400/CCCCCC/666666?text=Childhood+Photo',
      caption: ''
    },
    {
      id: 2,
      type: 'video',
      imageUrl: 'https://via.placeholder.com/400/CCCCCC/666666?text=Family+Video',
      videoUrl: 'https://example.com/video1.mp4',
      caption: 'Ordinary day. Extraordinary love'
    },
    {
      id: 3,
      type: 'video',
      imageUrl: 'https://via.placeholder.com/400/CCCCCC/666666?text=Youth+Video',
      videoUrl: 'https://example.com/video2.mp4',
      caption: 'At that moment - just beauty, youth, and a whole life ahead'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.profileId = +params['id'] || 1;
      // Aqui você carregaria os dados do perfil baseado no ID
      this.loadProfileData();
    });
  }

  loadProfileData() {
    // Aqui você buscaria os dados reais de uma API
    // Por enquanto, usa os dados de exemplo
  }

  goBack() {
    this.router.navigate(['/feed']);
  }

  playVideo(videoUrl: string) {
    // Implementar reprodução de vídeo
    console.log('Playing video:', videoUrl);
  }
}

