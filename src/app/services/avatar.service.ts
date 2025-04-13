import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private avatars = [
    '../../assets/Avtar.png',
    '../../assets/images1.png',
    '../../assets/image2.jpg',
    
  ];

  getRandomAvatar(): string {
    const randomIndex = Math.floor(Math.random() * this.avatars.length);
    return this.avatars[randomIndex];
  }
}