import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { RaceMeetService } from '../race-meet.service';
import { RaceMeetParameters } from '../models/racemeetparameters';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-race-meet-generator',
  templateUrl: './race-meet-generator.component.html',
  styleUrls: ['./race-meet-generator.component.css']
})
export class RaceMeetGeneratorComponent implements OnInit {
  hero: Hero;

  raceName = new FormControl('');

  constructor(private raceMeetService: RaceMeetService) { }

  ngOnInit() {
    this.hero = this.raceMeetService.getHero();
  }

  generateRaceMeet(): void {
    let meetParams = new RaceMeetParameters();

    meetParams.laneCount = 4;
    meetParams.name = this.raceName.value;
    meetParams.racesPerMeetCount = 8;

    this.raceMeetService.generateRaceMeet(meetParams);

    this.hero = this.raceMeetService.getHero();
  }
}
