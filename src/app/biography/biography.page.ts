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
  playingVideoId: number | null = null; // ID do vídeo que está sendo reproduzido
  
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
    // Dados dos perfis históricos
    const profilesData: any = {
      9: { // Napoleon Bonaparte
        id: 9,
        name: 'Napoleon Bonaparte',
        birthDate: '15.08.1769',
        deathDate: '05.05.1821',
        imageUrl: 'https://via.placeholder.com/200/8B7355/FFFFFF?text=NB',
        message: 'Emperor of the French, military genius, and one of history\'s most influential figures',
        relationship: 'In memory, a figure who shaped European history.',
        biography: {
          title: 'Biography',
          subtitle: 'The Rise of an Emperor: From Corsica to Continental Dominance.',
          text: 'Napoleon Bonaparte was born in Ajaccio, Corsica, and rose from relative obscurity to become Emperor of the French and one of the most celebrated military commanders in history. His strategic brilliance reshaped European politics and warfare, leaving an indelible mark on the continent. Through his military campaigns and legal reforms, Napoleon transformed the face of Europe and established a legacy that continues to be studied and debated to this day.'
        },
        personalReflection: {
          author: 'Historian, 2024',
          text: 'Napoleon\'s impact on European history is immeasurable. His military genius and administrative reforms continue to influence modern governance and military strategy.'
        },
        biographyItems: [
          {
            id: 1,
            type: 'photo',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Napoleon_Bonaparte.jpg/800px-Napoleon_Bonaparte.jpg',
            caption: 'Napoleon Bonaparte in his prime'
          },
          {
            id: 2,
            type: 'photo',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/800px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg',
            caption: 'Emperor Napoleon in his study'
          },
          {
            id: 3,
            type: 'video',
            imageUrl: 'https://img.youtube.com/vi/example1/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=example1',
            caption: 'Napoleon\'s military campaigns and legacy'
          }
        ]
      },
      10: { // John Lennon
        id: 10,
        name: 'John Lennon',
        birthDate: '09.10.1940',
        deathDate: '08.12.1980',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/85/John_Lennon_1969_%28cropped%29.jpg',
        message: 'Musician, songwriter, peace activist, and co-founder of The Beatles',
        relationship: 'In memory, a voice for peace and love that continues to inspire generations.',
        biography: {
          title: 'Biography',
          subtitle: 'From Liverpool to Legend: The Life of a Musical Revolutionary.',
          text: 'John Winston Ono Lennon was born in Liverpool, England, and became one of the most influential musicians and songwriters of the 20th century. As co-founder of The Beatles, he helped revolutionize popular music and culture. Beyond his musical achievements, Lennon became a prominent peace activist, using his platform to advocate for love, peace, and social change. His solo work, particularly with Yoko Ono, continued to push artistic and political boundaries until his tragic death in 1980. His message of peace and love endures as a powerful legacy.'
        },
        personalReflection: {
          author: 'Music Lover, 2024',
          text: 'John Lennon gave us music that changed the world and a message of peace that still resonates. His voice continues to inspire millions to imagine a better world.'
        },
        biographyItems: [
          {
            id: 1,
            type: 'photo',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/85/John_Lennon_1969_%28cropped%29.jpg',
            caption: 'John Lennon in 1969'
          },
          {
            id: 2,
            type: 'photo',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Beatles_White_Album.jpg/800px-Beatles_White_Album.jpg',
            caption: 'The Beatles - White Album era'
          },
          {
            id: 3,
            type: 'photo',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/John_Lennon_1964.jpg/800px-John_Lennon_1964.jpg',
            caption: 'John Lennon with The Beatles in 1964'
          },
          {
            id: 4,
            type: 'video',
            imageUrl: 'https://img.youtube.com/vi/YkgkThdzX-8/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=YkgkThdzX-8',
            caption: 'Imagine - John Lennon (Official Video)'
          },
          {
            id: 5,
            type: 'video',
            imageUrl: 'https://img.youtube.com/vi/RwUGSYDKUxU/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=RwUGSYDKUxU',
            caption: 'Give Peace a Chance - John Lennon & Yoko Ono'
          },
          {
            id: 6,
            type: 'video',
            imageUrl: 'https://img.youtube.com/vi/A_MjCqQoLLA/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=A_MjCqQoLLA',
            caption: 'The Beatles - Hey Jude (Live Performance)'
          },
          {
            id: 8,
            type: 'video',
            imageUrl: 'https://img.youtube.com/vi/iNweX0piP0g/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=iNweX0piP0g',
            caption: 'Biography of John Lennon - Documentary'
          },
          {
            id: 7,
            type: 'photo',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/John_Lennon_and_Yoko_Ono_1978.jpg/800px-John_Lennon_and_Yoko_Ono_1978.jpg',
            caption: 'John Lennon and Yoko Ono, 1978'
          }
        ]
      }
    };

    // Carregar dados do perfil se existir
    if (profilesData[this.profileId]) {
      const profileData = profilesData[this.profileId];
      this.profile = {
        id: profileData.id,
        name: profileData.name,
        birthDate: profileData.birthDate,
        deathDate: profileData.deathDate,
        imageUrl: profileData.imageUrl,
        message: profileData.message,
        relationship: profileData.relationship,
        biography: profileData.biography,
        personalReflection: profileData.personalReflection
      };
      this.biographyItems = profileData.biographyItems || [];
    } else {
      // Manter dados padrão para outros perfis
      // Os dados já estão definidos como padrão no componente
    }
  }

  goBack() {
    this.router.navigate(['/feed']);
  }

  playVideo(item: BiographyItem) {
    // Alternar entre reproduzir e parar o vídeo
    if (this.playingVideoId === item.id) {
      // Se o vídeo já está reproduzindo, parar
      this.playingVideoId = null;
    } else {
      // Caso contrário, iniciar a reprodução
      this.playingVideoId = item.id;
    }
  }

  getYouTubeEmbedUrl(videoUrl: string): string {
    // Extrair o ID do vídeo do YouTube da URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return '';
  }

  isVideoPlaying(itemId: number): boolean {
    return this.playingVideoId === itemId;
  }
}

