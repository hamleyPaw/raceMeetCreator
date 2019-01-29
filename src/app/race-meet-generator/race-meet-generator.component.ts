import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { RaceMeetService } from '../race-meet.service';
 

@Component({
  selector: 'app-race-meet-generator',
  templateUrl: './race-meet-generator.component.html',
  styleUrls: ['./race-meet-generator.component.css']
})
export class RaceMeetGeneratorComponent implements OnInit {
  hero: Hero;

  constructor(private raceMeetService: RaceMeetService) { }

  ngOnInit() {
    this.hero = this.raceMeetService.getHero();
  }

}
