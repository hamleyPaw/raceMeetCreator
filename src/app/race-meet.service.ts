import { Injectable } from '@angular/core';
import { Hero } from './models/hero';
import { RaceMeetParameters } from './models/racemeetparameters';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class RaceMeetService {

  private hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  private meetParams: RaceMeetParameters;

  constructor() { }

  getHero(): Hero {
    return this.hero;
  }

  generateRaceMeet(meetParameters: RaceMeetParameters) {
    this.meetParams = meetParameters;

    this.hero.name = this.meetParams.name;
    this.hero.id = this.meetParams.laneCount;
  }


}
