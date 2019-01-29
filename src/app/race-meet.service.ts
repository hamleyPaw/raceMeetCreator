import { Injectable } from '@angular/core';
import { Hero } from './models/hero';

@Injectable({
  providedIn: 'root'
})
export class RaceMeetService {

  private hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  getHero(): Hero {
    return this.hero;
  }
}
