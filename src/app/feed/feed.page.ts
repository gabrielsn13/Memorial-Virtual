import { Component, OnInit } from '@angular/core';

interface MemorialProfile {
  id: number;
  name: string;
  birthDate: string;
  deathDate: string;
  imageUrl: string;
  message: string;
  relationship: string;
}

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss'],
  standalone: false,
})
export class FeedPage implements OnInit {
  profiles: MemorialProfile[] = [
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
    }
  ];

  constructor() {}

  ngOnInit() {
    // Aqui você pode carregar os perfis de uma API
  }
}

