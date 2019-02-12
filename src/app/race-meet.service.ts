import { Injectable } from '@angular/core';
import { Racer } from './models/racer';
import { RaceMeetParameters } from './models/racemeetparameters';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class RaceMeetService {
  private meetParams: RaceMeetParameters;

  constructor() { }

  generateRaceMeet(meetParameters: RaceMeetParameters) {
    this.meetParams = meetParameters;

    // Do stuff

    // TODO return an object that represents the finish race schedule
  }
}
